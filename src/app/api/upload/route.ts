import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// Configure route for file uploads
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST /api/upload - Upload files (public for order attachments)
export async function POST(request: NextRequest) {
  console.log('[Upload API] Starting file upload...');
  
  try {
    // Get form data
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    
    console.log('[Upload API] Files received:', files.length);
    
    if (!files || files.length === 0) {
      console.log('[Upload API] No files provided');
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    // Log file details
    files.forEach((file, index) => {
      console.log(`[Upload API] File ${index + 1}:`, {
        name: file.name,
        type: file.type,
        size: `${(file.size / 1024).toFixed(2)} KB`
      });
    });

    // Validate files
    const allowedTypes = [
      'application/pdf', 
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg', 
      'image/png', 
      'image/webp', 
      'image/gif',
      'text/plain',
      'application/zip',
      'application/x-zip-compressed'
    ];
    
    // Also check file extensions as fallback
    const allowedExtensions = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.gif', '.txt', '.zip'];
    
    const maxSize = 20 * 1024 * 1024; // 20MB per file
    const maxTotalSize = 50 * 1024 * 1024; // 50MB total

    let totalSize = 0;
    for (const file of files) {
      // Check file type or extension
      const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
      const isAllowedType = allowedTypes.includes(file.type);
      const isAllowedExtension = allowedExtensions.includes(fileExtension);
      
      if (!isAllowedType && !isAllowedExtension) {
        console.log('[Upload API] Invalid file type:', file.type, 'extension:', fileExtension);
        return NextResponse.json({ 
          error: `Invalid file type: ${file.name}. Allowed: PDF, DOC, DOCX, Images, TXT, ZIP` 
        }, { status: 400 });
      }
      
      if (file.size > maxSize) {
        return NextResponse.json({ 
          error: `File ${file.name} exceeds 20MB limit` 
        }, { status: 400 });
      }
      totalSize += file.size;
    }
    
    if (totalSize > maxTotalSize) {
      return NextResponse.json({ 
        error: 'Total file size exceeds 50MB limit' 
      }, { status: 400 });
    }

    const uploadedUrls: string[] = [];
    const uploadDir = 'uploads/orders';
    
    // Create upload directory if it doesn't exist
    const uploadPath = path.join(process.cwd(), 'public', uploadDir);
    console.log('[Upload API] Upload path:', uploadPath);
    
    try {
      if (!existsSync(uploadPath)) {
        console.log('[Upload API] Creating upload directory...');
        await mkdir(uploadPath, { recursive: true });
        console.log('[Upload API] Directory created successfully');
      }
    } catch (dirError) {
      console.error('[Upload API] Error creating directory:', dirError);
      return NextResponse.json({ 
        error: 'Failed to create upload directory' 
      }, { status: 500 });
    }

    // Process each file
    for (const file of files) {
      try {
        // Generate unique filename
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(2, 8);
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const fileName = `${timestamp}-${randomStr}-${originalName}`;
        
        // Write file
        const filePath = path.join(uploadPath, fileName);
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        await writeFile(filePath, buffer);
        
        console.log('[Upload API] File written successfully:', filePath);

        // Add public URL
        uploadedUrls.push(`/${uploadDir}/${fileName}`);
      } catch (fileError) {
        console.error('[Upload API] Error writing file:', fileError);
        return NextResponse.json({ 
          error: `Failed to upload file: ${file.name}` 
        }, { status: 500 });
      }
    }

    console.log('[Upload API] Upload complete. URLs:', uploadedUrls);

    return NextResponse.json({
      success: true,
      message: 'Files uploaded successfully',
      urls: uploadedUrls,
      count: uploadedUrls.length,
    }, { status: 201 });
    
  } catch (error) {
    console.error('[Upload API] Upload error:', error);
    return NextResponse.json({ 
      error: 'Failed to upload files. Please try again.' 
    }, { status: 500 });
  }
}

# Deployment Guide for Stack Assignment

This guide explains how to deploy your Stack Assignment website to production.

## Prerequisites

- GitHub account
- Hosting platform account (Vercel, Railway, or Render)
- Domain name (optional)

---

## Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Stack Assignment website"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/stack-assignment.git

# Push
git branch -M main
git push -u origin main
```

---

## Step 2: Choose Hosting Platform

### Option A: Vercel (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your repository
5. Add environment variables:
   ```
   DATABASE_URL="your-database-url"
   NEXTAUTH_SECRET="random-32-character-string"
   NEXTAUTH_URL="https://your-app.vercel.app"
   ```
6. Click "Deploy"

**⚠️ Important for Vercel:** 
- SQLite doesn't work on Vercel (serverless functions)
- Use PostgreSQL or MySQL instead
- Free options: Neon, Supabase, or PlanetScale

### Option B: Railway

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables
6. Deploy!

**Benefits:** SQLite works on Railway

### Option C: Render

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Create "Web Service"
4. Connect repository
5. Configure:
   - Build: `bun install && bun run build && bun run db:push`
   - Start: `bun .next/standalone/server.js`
6. Add environment variables
7. Deploy

---

## Step 3: Database Configuration

### For SQLite (Railway/Render/VPS)
```env
DATABASE_URL="file:./data/prod.db"
```

### For PostgreSQL (Vercel/Neon)
1. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Get free PostgreSQL from:
   - [Neon](https://neon.tech) - Recommended
   - [Supabase](https://supabase.com)
   - [Railway](https://railway.app)

3. Add connection string to `DATABASE_URL`

### For MySQL (PlanetScale)
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
  relationMode = "prisma"
}
```

---

## Step 4: Environment Variables

Create these in your hosting platform:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Database connection | `file:./prod.db` or PostgreSQL URL |
| `NEXTAUTH_SECRET` | Random secret for sessions | Generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Your app URL | `https://your-app.vercel.app` |
| `NODE_ENV` | Environment | `production` |

---

## Step 5: Run Database Migrations

After first deploy, run migrations:

### Vercel
Add to `package.json`:
```json
{
  "scripts": {
    "postinstall": "prisma generate && prisma migrate deploy"
  }
}
```

### Railway/Render
Add to build command:
```bash
bun run db:push
```

### VPS
```bash
bun run db:push
# Or with migrations
bunx prisma migrate deploy
```

---

## Step 6: Custom Domain (Optional)

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records

### Railway
1. Go to Settings → Domains
2. Add custom domain
3. Update DNS

### Render
1. Go to Settings → Custom Domains
2. Add your domain
3. Update DNS

---

## Production Checklist

- [ ] Environment variables set
- [ ] Database configured
- [ ] Migrations run
- [ ] Admin user created (run seed script)
- [ ] Custom domain configured
- [ ] SSL enabled (automatic on most platforms)

---

## Creating Admin User in Production

After deployment, you need to create an admin user:

### Option 1: Use Prisma Studio
```bash
bunx prisma studio
```

### Option 2: Create seed script
```bash
bun run prisma/seed.ts
```

### Option 3: API call
Use the register endpoint with the first user, then manually update role to "admin" in database.

---

## Troubleshooting

### Build Fails
- Check Node.js version (18+)
- Check TypeScript errors
- Verify all dependencies

### Database Errors
- Verify DATABASE_URL
- Run migrations
- Check database permissions

### 500 Errors
- Check environment variables
- Review server logs
- Verify database connection

---

## Support

- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://prisma.io/docs
- Vercel Docs: https://vercel.com/docs

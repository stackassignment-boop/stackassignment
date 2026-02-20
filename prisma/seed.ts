import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@stackassignment.com' },
    update: {},
    create: {
      email: 'admin@stackassignment.com',
      password: adminPassword,
      name: 'Admin',
      role: 'admin',
      isActive: true,
    },
  });
  console.log('✅ Created admin user:', admin.email);

  // Create services
  const services = [
    {
      title: 'Essay Writing',
      slug: 'essay-writing',
      description: 'Professional essay writing services for all academic levels. We craft compelling, well-researched essays that meet your specific requirements and academic standards.',
      shortDescription: 'Expert essay writing for all academic levels',
      icon: 'fa-pen-fancy',
      features: ['Original content', 'Proper formatting', 'Citations included', 'Free revisions'],
      isActive: true,
      order: 1,
    },
    {
      title: 'Research Paper',
      slug: 'research-paper',
      description: 'Comprehensive research paper writing with in-depth analysis, proper methodology, and scholarly citations. Perfect for undergraduate and graduate students.',
      shortDescription: 'In-depth research papers with scholarly rigor',
      icon: 'fa-microscope',
      features: ['Literature review', 'Methodology', 'Data analysis', 'APA/MLA formatting'],
      isActive: true,
      order: 2,
    },
    {
      title: 'Dissertation Writing',
      slug: 'dissertation-writing',
      description: 'Complete dissertation writing support from proposal to final defense. Our PhD-qualified writers help you achieve academic excellence.',
      shortDescription: 'Full dissertation support from PhD experts',
      icon: 'fa-graduation-cap',
      features: ['Chapter-by-chapter delivery', 'Research design', 'Statistical analysis', 'Defense preparation'],
      isActive: true,
      order: 3,
    },
    {
      title: 'Thesis Writing',
      slug: 'thesis-writing',
      description: 'Professional thesis writing services for masters students. We help you develop a strong thesis statement and support it with rigorous research.',
      shortDescription: 'Expert thesis writing for masters students',
      icon: 'fa-book',
      features: ['Original research', 'Clear argumentation', 'Academic rigor', 'Timely delivery'],
      isActive: true,
      order: 4,
    },
    {
      title: 'Coursework Help',
      slug: 'coursework-help',
      description: 'Get help with your coursework assignments, including lab reports, case studies, presentations, and more.',
      shortDescription: 'Support for all types of coursework',
      icon: 'fa-book-open',
      features: ['Various formats', 'Subject expertise', 'Quick turnaround', 'Affordable pricing'],
      isActive: true,
      order: 5,
    },
    {
      title: 'Assignment Help',
      slug: 'assignment-help',
      description: 'General assignment assistance for all subjects and levels. From homework to complex projects, we have you covered.',
      shortDescription: 'General assignment assistance',
      icon: 'fa-tasks',
      features: ['All subjects', 'Any complexity', '24/7 support', 'Plagiarism-free'],
      isActive: true,
      order: 6,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: {
        ...service,
        features: JSON.stringify(service.features),
      },
    });
  }
  console.log('✅ Created services:', services.length);

  // Create sample papers
  const samples = [
    {
      title: 'The Impact of Social Media on Modern Communication',
      slug: 'impact-social-media-communication',
      description: 'A comprehensive analysis of how social media platforms have transformed interpersonal communication patterns.',
      subject: 'Communication Studies',
      academicLevel: 'bachelor',
      paperType: 'research_paper',
      pages: 8,
      content: 'Sample content placeholder...',
      isPublished: true,
    },
    {
      title: 'Machine Learning in Healthcare: Opportunities and Challenges',
      slug: 'machine-learning-healthcare',
      description: 'An exploration of ML applications in medical diagnosis and treatment, along with ethical considerations.',
      subject: 'Computer Science',
      academicLevel: 'master',
      paperType: 'research_paper',
      pages: 12,
      content: 'Sample content placeholder...',
      isPublished: true,
    },
    {
      title: 'Climate Change and Economic Policy: A Critical Review',
      slug: 'climate-change-economic-policy',
      description: 'A critical analysis of economic policies addressing climate change and their effectiveness.',
      subject: 'Economics',
      academicLevel: 'phd',
      paperType: 'dissertation',
      pages: 25,
      content: 'Sample content placeholder...',
      isPublished: true,
    },
  ];

  for (const sample of samples) {
    await prisma.sample.upsert({
      where: { slug: sample.slug },
      update: {},
      create: sample,
    });
  }
  console.log('✅ Created samples:', samples.length);

  // Create testimonials
  const testimonials = [
    {
      customerName: 'Rahul Sharma',
      customerTitle: 'MBA Student, IIM Bangalore',
      rating: 5,
      content: 'Stack Assignment helped me complete my dissertation on time. The quality was exceptional and the support team was very responsive.',
      isApproved: true,
    },
    {
      customerName: 'Priya Patel',
      customerTitle: 'Engineering Student, IIT Delhi',
      rating: 5,
      content: 'I was struggling with my research paper and they delivered an excellent paper within 48 hours. Highly recommended!',
      isApproved: true,
    },
    {
      customerName: 'Amit Kumar',
      customerTitle: 'PhD Candidate, JNU',
      rating: 4,
      content: 'Professional service with great attention to detail. The writer understood my requirements perfectly.',
      isApproved: true,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: testimonial,
    });
  }
  console.log('✅ Created testimonials:', testimonials.length);

  // Create pricing tiers
  const pricingTiers = [
    { name: 'High School', academicLevel: 'high_school', pricePerPage: 250, description: 'For high school and undergraduate students' },
    { name: 'Bachelor', academicLevel: 'bachelor', pricePerPage: 350, description: 'For bachelor degree students' },
    { name: 'Master', academicLevel: 'master', pricePerPage: 450, description: 'For masters degree students' },
    { name: 'PhD', academicLevel: 'phd', pricePerPage: 750, description: 'For PhD candidates and professionals' },
  ];

  for (const tier of pricingTiers) {
    const existing = await prisma.pricingTier.findFirst({
      where: { academicLevel: tier.academicLevel },
    });
    if (existing) {
      await prisma.pricingTier.update({
        where: { id: existing.id },
        data: tier,
      });
    } else {
      await prisma.pricingTier.create({
        data: tier,
      });
    }
  }
  console.log('✅ Created pricing tiers:', pricingTiers.length);

  console.log('✅ Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

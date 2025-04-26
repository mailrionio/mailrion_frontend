export interface TemplateEntry {
  label: string;
  media: string;
  content: Record<string, string>;
}

export interface TemplateData {
  Corporate: Record<string, TemplateEntry>;
  Education: Record<string, TemplateEntry>;
  "Landing Page": Record<string, TemplateEntry>;
  News: Record<string, TemplateEntry>;
  Portfolio: Record<string, TemplateEntry>;
}

export const templateData: TemplateData = {
  "Landing Page": {
    "Landing Page": {
      label: "Landing Page",
      media: "/templates/Landing Page/Landing Page/media.jpg",
      content: {
        home: "/templates/Landing Page/Landing Page/index.html",
      },
    },
    "Landing Page 2": {
      label: "Landing Page 2",
      media: "/templates/Landing Page/Landing Page 2/media.jpg",
      content: {
        home: "/templates/Landing Page/Landing Page 2/index.html",
      },
    },
    "Mobile App Landing Page": {
      label: "Mobile App Landing Page",
      media: "/templates/Landing Page/Mobile App Landing Page/media.jpg",
      content: {
        home: "/templates/Landing Page/Mobile App Landing Page/index.html",
      },
    },
    "Product Landing Page": {
      label: "Product Landing Page",
      media: "/templates/Landing Page/Product Landing Page/media.jpg",
      content: {
        home: "/templates/Landing Page/Product Landing Page/index.html",
      },
    },
    "Software Landing Page": {
      label: "Software Landing Page",
      media: "/templates/Landing Page/Software Landing Page/media.jpg",
      content: {
        home: "/templates/Landing Page/Software Landing Page/index.html",
      },
    },
    "Weight Loss Landing Page": {
      label: "Weight Loss Landing Page",
      media: "/templates/Landing Page/Weight Loss Landing Page/media.jpg",
      content: {
        home: "/templates/Landing Page/Weight Loss Landing Page/index.html",
      },
    },
  },
  Portfolio: {
    "Bootstrap Resume": {
      label: "Bootstrap Resume",
      media: "/templates/Portfolio/Bootstrap Resume/media.jpg",
      content: {
        home: "/templates/Portfolio/Bootstrap Resume/index.html",
      },
    },
    "Developer Portfolio": {
      label: "Developer Portfolio",
      media: "/templates/Portfolio/Developer Portfolio/media.jpg",
      content: {
        home: "/templates/Portfolio/Developer Portfolio/index.html",
      },
    },
    "Freelancer Portfolio": {
      label: "Freelancer Portfolio",
      media: "/templates/Portfolio/Freelancer Portfolio/media.jpg",
      content: {
        home: "/templates/Portfolio/Freelancer Portfolio/index.html",
      },
    },
    "Personal Portfolio": {
      label: "Personal Portfolio",
      media: "/templates/Portfolio/Personal Portfolio/media.jpg",
      content: {
        home: "/templates/Portfolio/Personal Portfolio/index.html",
      },
    },
    "Personal Website": {
      label: "Personal Website",
      media: "/templates/Portfolio/Personal Website/media.jpg",
      content: {
        home: "/templates/Portfolio/Personal Website/index.html",
      },
    },
    "Resume Website": {
      label: "Resume Website",
      media: "/templates/Portfolio/Resume Website/media.jpg",
      content: {
        home: "/templates/Portfolio/Resume Website/index.html",
      },
    },
  },
  Corporate: {
    "Artificial Intelligence": {
      label: "Artificial Intelligence",
      media: "/templates/Corporate/Artificial Intelligence/media.jpg",
      content: {
        home: "/templates/Corporate/Artificial Intelligence/index.html",
        about: "/templates/Corporate/Artificial Intelligence/about.html",
        contact: "/templates/Corporate/Artificial Intelligence/contact.html",
        feature: "/templates/Corporate/Artificial Intelligence/feature.html",
        faq: "/templates/Corporate/Artificial Intelligence/faq.html",
        project: "/templates/Corporate/Artificial Intelligence/project.html",
        service: "/templates/Corporate/Artificial Intelligence/service.html",
        team: "/templates/Corporate/Artificial Intelligence/team.html",
        testimonial:
          "/templates/Corporate/Artificial Intelligence/testimonial.html",
        404: "/templates/Corporate/Artificial Intelligence/404.html",
      },
    },
    "Car Rent": {
      label: "Car Rent",
      media: "/templates/Corporate/Car Rent/media.jpg",
      content: {
        home: "/templates/Corporate/Car Rent/index.html",
        about: "/templates/Corporate/Car Rent/about.html",
        blog: "/templates/Corporate/Car Rent/blog.html",
        feature: "/templates/Corporate/Car Rent/feature.html",
        contact: "/templates/Corporate/Car Rent/contact.html",
        cars: "/templates/Corporate/Car Rent/cars.html",
        service: "/templates/Corporate/Car Rent/service.html",
        team: "/templates/Corporate/Car Rent/team.html",
        testimonial: "/templates/Corporate/Car Rent/testimonial.html",
        404: "/templates/Corporate/Car Rent/404.html",
      },
    },
    "Digital Agency": {
      label: "Digital Agency",
      media: "/templates/Corporate/Digital Agency/media.jpg",
      content: {
        home: "/templates/Corporate/Digital Agency/index.html",
        about: "/templates/Corporate/Digital Agency/about.html",
        contact: "/templates/Corporate/Digital Agency/contact.html",
        project: "/templates/Corporate/Digital Agency/project.html",
        service: "/templates/Corporate/Digital Agency/service.html",
        team: "/templates/Corporate/Digital Agency/team.html",
        testimonial: "/templates/Corporate/Digital Agency/testimonial.html",
        404: "/templates/Corporate/Digital Agency/404.html",
      },
    },
    "IT Solutions": {
      label: "IT Solutions",
      media: "/templates/Corporate/IT Solutions/media.jpg",
      content: {
        home: "/templates/Corporate/IT Solutions/index.html",
        about: "/templates/Corporate/IT Solutions/about.html",
        blog: "/templates/Corporate/IT Solutions/blog.html",
        contact: "/templates/Corporate/IT Solutions/contact.html",
        project: "/templates/Corporate/IT Solutions/project.html",
        service: "/templates/Corporate/IT Solutions/service.html",
        team: "/templates/Corporate/IT Solutions/team.html",
        testimonial: "/templates/Corporate/IT Solutions/testimonial.html",
        404: "/templates/Corporate/IT Solutions/404.html",
      },
    },
    "Life Insurance": {
      label: "Life Insurance",
      media: "/templates/Corporate/Life Insurance/media.jpg",
      content: {
        home: "/templates/Corporate/Life Insurance/index.html",
        about: "/templates/Corporate/Life Insurance/about.html",
        blog: "/templates/Corporate/Life Insurance/blog.html",
        contact: "/templates/Corporate/Life Insurance/contact.html",
        faq: "/templates/Corporate/Life Insurance/FAQ.html",
        feature: "/templates/Corporate/Life Insurance/feature.html",
        service: "/templates/Corporate/Life Insurance/service.html",
        team: "/templates/Corporate/Life Insurance/team.html",
        testimonial: "/templates/Corporate/Life Insurance/testimonial.html",
        404: "/templates/Corporate/Life Insurance/404.html",
      },
    },
    SAAS: {
      label: "SAAS",
      media: "/templates/Corporate/SAAS/media.jpg",
      content: {
        home: "/templates/Corporate/SAAS/index.html",
        about: "/templates/Corporate/SAAS/about.html",
        blog: "/templates/Corporate/SAAS/blog.html",
        contact: "/templates/Corporate/SAAS/contact.html",
        feature: "/templates/Corporate/SAAS/feature.html",
        pricing: "/templates/Corporate/SAAS/pricing.html",
        service: "/templates/Corporate/SAAS/service.html",
        testimonial: "/templates/Corporate/SAAS/testimonial.html",
        404: "/templates/Corporate/SAAS/404.html",
      },
    },
  },
  Education: {
    "Driving School": {
      label: "Driving School",
      media: "/templates/Education/Driving School/media.jpg",
      content: {
        home: "/templates/Education/Driving School/index.html",
        about: "/templates/Education/Driving School/about.html",
        appointment: "/templates/Education/Driving School/appointment.html",
        contact: "/templates/Education/Driving School/contact.html",
        courses: "/templates/Education/Driving School/courses.html",
        feature: "/templates/Education/Driving School/feature.html",
        team: "/templates/Education/Driving School/team.html",
        testimonial: "/templates/Education/Driving School/testimonial.html",
        404: "/templates/Education/Driving School/404.html",
      },
    },
    Elearning: {
      label: "Elearning",
      media: "/templates/Education/Elearning/media.jpg",
      content: {
        home: "/templates/Education/Elearning/index.html",
        about: "/templates/Education/Elearning/about.html",
        contact: "/templates/Education/Elearning/contact.html",
        courses: "/templates/Education/Elearning/courses.html",
        team: "/templates/Education/Elearning/team.html",
        testimonial: "/templates/Education/Elearning/testimonial.html",
        404: "/templates/Education/Elearning/404.html",
      },
    },
    Kindergarten: {
      label: "Kindergarten",
      media: "/templates/Education/Kindergarten/media.jpg",
      content: {
        home: "/templates/Education/Kindergarten/index.html",
        about: "/templates/Education/Kindergarten/about.html",
        blog: "/templates/Education/Kindergarten/blog.html",
        class: "/templates/Education/Kindergarten/class.html",
        contact: "/templates/Education/Kindergarten/contact.html",
        gallery: "/templates/Education/Kindergarten/gallery.html",
        single: "/templates/Education/Kindergarten/single.html",
        team: "/templates/Education/Kindergarten/team.html",
      },
    },
    Preschool: {
      label: "Preschool",
      media: "/templates/Education/Preschool/media.jpg",
      content: {
        home: "/templates/Education/Preschool/index.html",
        about: "/templates/Education/Preschool/about.html",
        appointment: "/templates/Education/Preschool/appointment.html",
        call: "/templates/Education/Preschool/call-to-action.html",
        classes: "/templates/Education/Preschool/classes.html",
        contact: "/templates/Education/Preschool/contact.html",
        facility: "/templates/Education/Preschool/facility.html",
        team: "/templates/Education/Preschool/team.html",
        testimonial: "/templates/Education/Preschool/testimonial.html",
        404: "/templates/Education/Preschool/404.html",
      },
    },
  },
  News: {
    "Bootstrap Magazine": {
      label: "Bootstrap Magazine",
      media: "/templates/News/Bootstrap Magazine/media.jpg",
      content: {
        home: "/templates/News/Bootstrap Magazine/index.html",
        contact: "/templates/News/Bootstrap Magazine/contact.html",
        category: "/templates/News/Bootstrap Magazine/category.html",
        single: "/templates/News/Bootstrap Magazine/single.html",
      },
    },
    "Bootstrap News": {
      label: "Bootstrap News",
      media: "/templates/News/Bootstrap News/media.jpg",
      content: {
        home: "/templates/News/Bootstrap News/index.html",
        contact: "/templates/News/Bootstrap News/contact.html",
        single: "/templates/News/Bootstrap News/single-page.html",
      },
    },
    Magazine: {
      label: "Magazine",
      media: "/templates/News/Magazine/media.jpg",
      content: {
        home: "/templates/News/Magazine/index.html",
        contact: "/templates/News/Magazine/contact.html",
        detail: "/templates/News/Magazine/detail-page.html",
        404: "/templates/News/Magazine/404.html",
      },
    },
    News: {
      label: "News",
      media: "/templates/News/News/media.jpg",
      content: {
        home: "/templates/News/News/index.html",
        category: "/templates/News/News/category.html",
        contact: "/templates/News/News/contact.html",
        single: "/templates/News/News/single.html",
      },
    },
  },
};

export const emailTempData = {
  Email: {
    Clock: {
      label: "Clock",
      media: "/templates/Email/Clock/media.jpg",
      content: {
        home: "/templates/Email/Clock/clock.html",
      },
    },
    "App Release": {
      label: "App Release",
      media: "/templates/Email/App Release/media.jpg",
      content: {
        home: "/templates/Email/App Release/app_release.html",
      },
    },
    Bar: {
      label: "Bar",
      media: "/templates/Email/Bar/media.jpg",
      content: {
        home: "/templates/Email/Bar/Bar.html",
      },
    },
    "Company Update": {
      label: "Company Update",
      media: "/templates/Email/Company Update/media.jpg",
      content: {
        home: "/templates/Email/Company Update/Company Update.html",
      },
    },
    Elephants: {
      label: "Elephants",
      media: "/templates/Email/Elephants/media.jpg",
      content: {
        home: "/templates/Email/Elephants/Elephants.html",
      },
    },
    "Finance Approval": {
      label: "Finance Approval",
      media: "/templates/Email/Finance Approval/media.jpg",
      content: {
        home: "/templates/Email/Finance Approval/Finance Approval.html",
      },
    },
    Funding: {
      label: "Funding",
      media: "/templates/Email/Funding/media.jpg",
      content: {
        home: "/templates/Email/Funding/Funding.html",
      },
    },
    "Grand Opening": {
      label: "Grand Opening",
      media: "/templates/Email/Grand Opening/media.jpg",
      content: {
        home: "/templates/Email/Grand Opening/Grand Opening.html",
      },
    },
    "Learning Courses": {
      label: "Learning Courses",
      media: "/templates/Email/Learning Courses/media.jpg",
      content: {
        home: "/templates/Email/Learning Courses/Learning Courses.html",
      },
    },
    Makeup: {
      label: "Makeup",
      media: "/templates/Email/Makeup/media.jpg",
      content: {
        home: "/templates/Email/Makeup/Makeup.html",
      },
    },
    "Marketing News": {
      label: "Marketing News",
      media: "/templates/Email/Marketing News/media.jpg",
      content: {
        home: "/templates/Email/Marketing News/Marketing News.html",
      },
    },
    "Medical Appointment": {
      label: "Medical Appointment",
      media: "/templates/Email/Medical Appointment/media.jpg",
      content: {
        home: "/templates/Email/Medical Appointment/Medical Appointment.html",
      },
    },
    "Networking Event": {
      label: "Networking Event",
      media: "/templates/Email/Networking Event/media.jpg",
      content: {
        home: "/templates/Email/Networking Event/Networking Event.html",
      },
    },
    "Purchase Confirmation": {
      label: "Purchase Confirmation",
      media: "/templates/Email/Purchase Confirmation/media.jpg",
      content: {
        home: "/templates/Email/Purchase Confirmation/Purchase Confirmation.html",
      },
    },
    "Season of Thanks": {
      label: "Season of Thanks",
      media: "/templates/Email/Season of Thanks/media.jpg",
      content: {
        home: "/templates/Email/Season of Thanks/Season of Thanks.html",
      },
    },
    "Tech Devices": {
      label: "Tech Devices",
      media: "/templates/Email/Tech Devices/media.jpg",
      content: {
        home: "/templates/Email/Tech Devices/Tech Devices.html",
      },
    },
    "Travel Packages": {
      label: "Travel Packages",
      media: "/templates/Email/Travel Packages/media.jpg",
      content: {
        home: "/templates/Email/Travel Packages/Travel Packages.html",
      },
    },
    "Travel Site": {
      label: "Travel Site",
      media: "/templates/Email/Travel Site/media.jpg",
      content: {
        home: "/templates/Email/Travel Site/Travel Site.html",
      },
    },
    "Version Release": {
      label: "Version Release",
      media: "/templates/Email/Version Release/media.jpg",
      content: {
        home: "/templates/Email/Version Release/Version Release.html",
      },
    },
    "Womens Day": {
      label: "Womens Day",
      media: "/templates/Email/Womens Day/media.jpg",
      content: {
        home: "/templates/Email/Womens Day/Womens Day.html",
      },
    },
  },
};

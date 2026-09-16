import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/client/', '/staff/', '/associate/', '/login', '/setup-password'],
    },
    sitemap: 'http://ld9lmhwfryjdvsaopzuedtd4.187.127.150.158.sslip.io/sitemap.xml',
  }
}

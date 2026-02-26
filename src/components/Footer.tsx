
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'GitHub', icon: <Github size={18} />, url: 'https://github.com/mwakidenis' },
    { name: 'LinkedIn', icon: <Linkedin size={18} />, url: 'https://www.linkedin.com/in/denis-it-54199939a/' },
    { name: 'Twitter', icon: <Twitter size={18} />, url: 'https://x.com/Apro5550' },
    { name: 'Email', icon: <Mail size={18} />, url: 'mailto:mwakidenice@gmail.com' },
  ];

  return (
    <footer className="bg-background border-t py-8 sm:py-10">
      <div className="container px-3 sm:px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="font-heading font-bold text-lg sm:text-xl">
              <span className="text-gradient">Denis</span>
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-md">
              Creating digital experiences that inspire. Passionate about clean code, user-focused design, and impact-driven tech. Built by Mwaki Denis | Software Engineer & Startup Enthusiast 🚀
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-accent/10 transition-colors"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {year} Mwaki Denis✨. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

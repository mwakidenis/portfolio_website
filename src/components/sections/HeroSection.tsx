import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsMounted(true);

    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 10;
      const y = (clientY / window.innerHeight - 0.5) * 10;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  return (
    <section
      id="home"
      className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden w-full"
    >
      <div className="w-full px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
          {/* TEXT */}
          <div className="md:col-span-7 space-y-4 md:space-y-6 text-center md:text-left">
            <ScrollReveal delay={200} direction="left">
              <div className="inline-block glass px-3 py-1.5 rounded-full mb-2 text-xs sm:text-sm">
                <span className="text-primary">✦</span> UI/UX Designer & Software
                Developer <span className="ml-1">✦</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400} direction="left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Hi, I'm <span className="text-gradient">Mwaki Denis</span>{" "}
                <span className="inline-block animate-bounce">👋</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={600} direction="left">
              <p className="text-base md:text-xl text-muted-foreground">
                Driven by quality and performance mindset, I craft elegant
                products that users love ❤️ and businesses value 💻. I'm
                primarily focusing on design, scalable architecture,
                algorithmic efficiency, and resilient deployment.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={800} direction="left">
              <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-3 md:gap-4">
                <Button size={isMobile ? "default" : "lg"} asChild>
                  <a href="#contact">Get in touch 📩</a>
                </Button>
                <Button
                  variant="outline"
                  size={isMobile ? "default" : "lg"}
                  asChild
                >
                  <a href="#projects">View my work 👀</a>
                </Button>
              </div>
            </ScrollReveal>
          </div>

          {/* IMAGE */}
          <ScrollReveal delay={1000} direction="right" className="md:col-span-5">
            <div className="relative w-full max-w-full sm:max-w-[300px] md:max-w-[400px] aspect-square mx-auto overflow-hidden">
              {!isMobile && (
                <>
                  {/* Background blobs and effects */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse-slow" />
                  <div className="absolute -top-4 -left-4 h-24 w-24 rounded-full bg-accent/40 blur-lg animate-blob" />
                  <div className="absolute -bottom-6 -right-2 h-28 w-28 rounded-full bg-primary/40 blur-lg animate-blob animation-delay-2000" />
                  <div className="absolute top-[60%] left-[-15px] h-[70px] w-[70px] rounded-full bg-primary/50 blur-lg animate-blob animation-delay-4000" />
                  <div className="absolute top-[-10px] right-[25%] h-[80px] w-[80px] rounded-full bg-accent/50 blur-lg animate-blob animation-delay-3000" />

                  {/* Radial gradient overlay */}
                  <div
                    className="absolute inset-0 rounded-full opacity-80"
                    style={{
                      background:
                        "radial-gradient(circle at center, transparent 60%, rgba(var(--primary), 0.2) 100%)",
                    }}
                  />

                  {/* Animated rings */}
                  <div className="absolute inset-[5%] border-2 border-dashed border-primary/30 rounded-full animate-[spin_40s_linear_infinite]" />
                  <div className="absolute inset-[15%] border border-dotted border-accent/20 rounded-full animate-[spin_30s_linear_infinite_reverse]" />

                  {/* Outer glow */}
                  <div className="absolute inset-[-10%] blur-xl bg-gradient-to-br from-primary/10 to-accent/10 rounded-full"></div>

                  {/* Floating particles */}
                  <div
                    className="absolute h-4 w-4 rounded-full bg-primary/60 blur-sm animate-float"
                    style={{ top: "20%", left: "10%", animationDelay: "0s" }}
                  />
                  <div
                    className="absolute h-3 w-3 rounded-full bg-primary/70 blur-sm animate-float"
                    style={{ top: "70%", left: "15%", animationDelay: "1.5s" }}
                  />
                  <div
                    className="absolute h-5 w-5 rounded-full bg-accent/60 blur-sm animate-float"
                    style={{ top: "30%", right: "10%", animationDelay: "1s" }}
                  />
                  <div
                    className="absolute h-3 w-3 rounded-full bg-accent/70 blur-sm animate-float"
                    style={{ bottom: "20%", right: "15%", animationDelay: "2s" }}
                  />
                  <div
                    className="absolute h-6 w-6 rounded-full bg-primary/30 blur-lg animate-float"
                    style={{ top: "50%", left: "50%", animationDelay: "2.5s" }}
                  />
                  <div
                    className="absolute h-4 w-4 rounded-full bg-accent/30 blur-lg animate-float"
                    style={{ top: "40%", right: "30%", animationDelay: "3.5s" }}
                  />
                </>
              )}

              {/* Profile image with parallax */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div
                  className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[300px] md:h-[300px]"
                  style={{
                    transform:
                      isMounted && !isMobile
                        ? `translate(${mousePosition.x * -0.8}px, ${mousePosition.y * -0.8}px)`
                        : "none",
                    transition: "transform 0.1s ease-out",
                  }}
                >
                  <img
                    src="/20240814_132224.jpg"
                    alt="Mwaki Denis"
                    className="w-full h-full object-cover rounded-full border-4 border-background shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

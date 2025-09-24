"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { members, projects } from "../data/content";

if (typeof window !== "undefined" && gsap && (gsap as any).registerPlugin) {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const membersRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const navOverlayRef = useRef<HTMLDivElement | null>(null);
  const burgerTop = useRef<HTMLSpanElement | null>(null);
  const burgerMid = useRef<HTMLSpanElement | null>(null);
  const burgerBot = useRef<HTMLSpanElement | null>(null);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const cursorEl = cursorRef.current;
    if (!cursorEl) return;
    const move = (e: MouseEvent) => {
      gsap.to(cursorEl, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // drop-in title
    tl.from("[data-hero-title]", {
      yPercent: -150,
      rotation: -2,
      scale: 0.8,
      duration: 1.2,
      ease: "power4.out",
    })
      // shape pop-in
      .from(
        "[data-geo-shape]",
        {
          scale: 0,
          rotation: 180,
          transformOrigin: "center",
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.8"
      )
      // motto typewriter effect
      .from(
        "[data-hero-motto] span",
        {
          opacity: 0,
          x: -20,
          stagger: 0.03,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
      )

      .from(
        "[data-brutalist-line]",
        {
          scaleX: 0,
          transformOrigin: "left center",
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .to("[data-geo-shape]", {
        rotation: 360,
        repeat: -1,
        ease: "none",
        transformOrigin: "center",
      });
  }, []);

  useEffect(() => {
    // slide-in members from left and flip-in cards
    if (membersRef.current) {
      gsap.fromTo(
        membersRef.current.querySelector("h2"),
        { x: -200, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: membersRef.current,
            start: "top 60%",
          },
        }
      );

      gsap.from(membersRef.current.querySelectorAll("[data-member-card]"), {
        rotateY: 90,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: membersRef.current,
          start: "top 50%",
        },
      });
    }

    if (projectsRef.current) {
      gsap.fromTo(
        projectsRef.current.querySelector("h2"),
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 60%",
          },
        }
      );

      gsap.from(projectsRef.current.querySelectorAll(".grid > div"), {
        scale: 0.6,
        y: 100,
        rotation: 5,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top 40%",
        },
      });
    }

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  // cursor hover effects
  useEffect(() => {
    const cursorEl = cursorRef.current;
    if (!cursorEl) return;
    const interactive = document.querySelectorAll(
      "button, a, [data-cursor=hover]"
    );
    const enter = () =>
      gsap.to(cursorEl, { scale: 1.3, duration: 0.3, ease: "power3.out" });
    const leave = () =>
      gsap.to(cursorEl, { scale: 1, duration: 0.35, ease: "power3.out" });
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });
    return () =>
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
  }, []);

  useEffect(() => {
    const overlay = navOverlayRef.current;
    if (!overlay) return;
    gsap.set(overlay, { autoAlpha: 0 });
    if (navOpen) {
      gsap.to(overlay, { autoAlpha: 1, duration: 0.4, ease: "power2.out" });
      gsap.fromTo(
        overlay.querySelectorAll("[data-nav-link]"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.08,
        }
      );
    } else {
      gsap.to(overlay, { autoAlpha: 0, duration: 0.35, ease: "power2.in" });
    }
  }, [navOpen]);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.35, ease: "power3.inOut" },
    });
    if (navOpen) {
      tl.to(burgerTop.current, { y: 8, rotate: 45 }, 0)
        .to(burgerMid.current, { opacity: 0 }, 0)
        .to(burgerBot.current, { y: -8, rotate: -45 }, 0);
    } else {
      tl.to(burgerTop.current, { y: 0, rotate: 0 }, 0)
        .to(burgerMid.current, { opacity: 1 }, 0)
        .to(burgerBot.current, { y: 0, rotate: 0 }, 0);
    }
  }, [navOpen]);

  const toggleNav = () => setNavOpen((o) => !o);

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    setNavOpen(false);
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (heroRef.current) {
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        pin: true,
        pinSpacing: false,
        end: () => "+=" + window.innerHeight * 0.6,
      });
    }

    // on hover show accent line and zoom image slightly
    const memberCards = gsap.utils.toArray<HTMLElement>("[data-member-card]");
    memberCards.forEach((card) => {
      const img = card.querySelector("[data-member-img]");
      const enter = () => {
        gsap.to(img, { scale: 1.05, duration: 0.4, ease: "power3.out" });
        gsap.fromTo(
          card.querySelector("[data-accent]"),
          { scaleX: 0 },
          { scaleX: 1, duration: 0.5, ease: "power3.out" }
        );
      };
      const leave = () => {
        gsap.to(img, { scale: 1, duration: 0.5, ease: "power3.out" });
        gsap.to(card.querySelector("[data-accent]"), {
          scaleX: 0,
          duration: 0.5,
          ease: "power3.inOut",
        });
      };
      card.addEventListener("mouseenter", enter);
      card.addEventListener("mouseleave", leave);
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <main className="relative font-sans text-neutral-900 bg-white">
      <div ref={cursorRef} className="peak-cursor" aria-hidden>
        <div className="absolute inset-0 border-1 border-[var(--brand-blue)] rounded-full"></div>
        <svg viewBox="0 0 331.12 408.64" className="w-8 h-8">
          <path
            fill="var(--brand-blue)"
            d="M104.52,162.56c23.67,43,46.07,83.7,69.55,126.34,6.5-14.44,7.32-28.53,14.04-41.14,6.94,8.06,10.44,18.01,15.48,27.08,19.93,35.85,40.34,71.44,60.25,107.3,3.28,5.91,6.62,8.46,13.82,7.7,17.15-1.82,34.42-2.56,53.47-3.87C246.21,256.21,162.38,128.11,78.55,0l-3.18,.7C50.33,136.23,25.29,271.77,0,408.64c17.76-1.22,34.59-2.41,51.43-3.49,4.43-.28,6.32-1.9,7.23-6.75,12.37-65.87,25.03-131.68,37.72-197.49,2.31-11.99,5.06-23.9,8.14-38.35Z"
          />
        </svg>
      </div>
      <header className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 backdrop-blur-sm">
        <div className="flex items-center">
          <img
            src="/peak-logo.svg"
            alt="Peak Solutions Logo"
            className="w-8 h-auto"
          />
        </div>
        <button
          aria-label="Toggle navigation"
          onClick={toggleNav}
          className="relative w-12 h-12 flex items-center justify-center rounded-full border border-[var(--brand-blue)] hover:bg-[var(--brand-blue)]/10 transition-colors"
        >
          <span
            ref={burgerTop}
            className="absolute block h-[2px] w-6 bg-[var(--brand-blue)] rounded"
          />
          <span
            ref={burgerMid}
            className="absolute block h-[2px] w-6 bg-[var(--brand-blue)] rounded"
          />
          <span
            ref={burgerBot}
            className="absolute block h-[2px] w-6 bg-[var(--brand-blue)] rounded"
          />
        </button>
      </header>
      <div
        ref={navOverlayRef}
        className="fixed inset-0 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center gap-10 text-3xl font-medium z-40"
        style={{ pointerEvents: navOpen ? "auto" : "none" }}
      >
        <button
          data-nav-link
          onClick={() => scrollTo(heroRef)}
          className="hover:text-[var(--brand-blue)] transition-colors"
        >
          Hero
        </button>
        <button
          data-nav-link
          onClick={() => scrollTo(membersRef)}
          className="hover:text-[var(--brand-blue)] transition-colors"
        >
          Members
        </button>
        <button
          data-nav-link
          onClick={() => scrollTo(projectsRef)}
          className="hover:text-[var(--brand-blue)] transition-colors"
        >
          Projects
        </button>
      </div>
      <section
        ref={heroRef}
        id="hero"
        data-panel
        className="h-screen relative bg-white overflow-hidden flex items-start justify-start"
      >
        {/* geometric shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            data-geo-shape
            className="absolute top-20 right-16 w-32 h-32 bg-[var(--brand-blue)] transform rotate-45"
          />
          <div
            data-geo-shape
            className="absolute bottom-32 left-24 w-24 h-64 bg-black"
          />
          <div
            data-geo-shape
            className="absolute top-28 right-1/3 w-48 h-8 bg-[var(--brand-blue)]"
          />
        </div>

        {/* bold lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            data-brutalist-line
            className="absolute top-0 left-0 w-full h-2 bg-black"
          />
          <div
            data-brutalist-line
            className="absolute top-[23%] left-0 w-3/4 h-1 bg-[var(--brand-blue)]"
          />
          <div
            data-brutalist-line
            className="absolute top-2/5 left-0 w-3/4 h-1 bg-black"
          />
          <div
            data-brutalist-line
            className="absolute bottom-0 left-0 w-full h-3 bg-[var(--brand-blue)]"
          />
        </div>

        {/* hero */}
        <div className="absolute top-8 left-8 lg:top-16 lg:left-16">
          <h1
            data-hero-title
            className="text-[12vw] lg:text-[10vw] font-black leading-[0.8] tracking-tight text-black select-none uppercase"
            style={{ fontFamily: "Arial Black, Arial, sans-serif" }}
          >
            PEAK
            <br />
            <span className="text-[var(--brand-blue)]">solutions</span>
          </h1>
        </div>

        {/* motto */}
        <div className="absolute bottom-16 right-8 lg:bottom-24 lg:right-16 max-w-4xl text-right">
          <p
            data-hero-motto
            className="text-lg lg:text-6xl font-bold uppercase tracking-wide text-black leading-tight"
          >
            SOARING NEW HEIGHTS, REACHING THE SUMMIT OF INNOVATION
          </p>
        </div>
      </section>
      <section
        ref={membersRef}
        id="members"
        className="h-screen flex flex-col px-8 pt-40 pb-12 bg-white relative overflow-hidden"
      >
        <div className="flex items-end gap-8 mb-10">
          <h2 className="text-6xl lg:text-8xl leading-none font-black text-black">
            meet the team.
          </h2>
          <div className="flex-1 h-2 bg-[var(--brand-blue)]" />
        </div>
        <div className="relative w-full h-full">
          <div className="absolute inset-0 overflow-x-auto overflow-y-hidden no-scrollbar">
            <div className="flex gap-8 pr-20 h-full items-stretch">
              {members.map((m, i) => (
                <div
                  key={i}
                  data-member-card
                  data-cursor="hover"
                  className="group relative w-[320px] min-w-[320px] h-full border-2 border-black bg-white flex flex-col"
                >
                  <div className="relative w-full aspect-[4/5] overflow-hidden">
                    <img
                      src={m.img}
                      alt={m.name + " photo"}
                      className="w-full h-full object-cover"
                      data-member-img
                      draggable={false}
                    />
                    <span
                      data-accent
                      className="absolute bottom-0 left-0 h-1 w-full bg-[var(--brand-blue)] origin-left scale-x-0"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    <h3 className="text-lg font-black uppercase tracking-tight text-black">
                      {m.name}
                    </h3>
                    <p className="text-[var(--brand-blue)] text-xs font-bold uppercase tracking-wide">
                      {m.role}
                    </p>
                    <p className="text-gray-600 text-xs leading-snug pr-2">
                      {m.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section
        ref={projectsRef}
        id="projects"
        data-panel
        className="h-screen flex flex-col justify-center px-8 py-24 bg-black text-white relative"
      >
        {/* header*/}
        <div className="mb-16">
          <h2 className="text-6xl lg:text-8xl font-black text-white mb-4">
            what we've done.
          </h2>
          <div className="w-32 h-2 bg-[var(--brand-blue)]" />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <div
              key={i}
              className="border-4 border-white p-8 bg-black hover:bg-[var(--brand-blue)] transition-colors duration-300 group"
              data-cursor="hover"
            >
              <h3 className="text-2xl font-black uppercase mb-4 text-white group-hover:text-black">
                {p.title}
              </h3>
              <p className="text-gray-300 text-sm mb-4 font-medium group-hover:text-black">
                {p.summary}
              </p>
              <p className="text-gray-400 text-sm font-medium group-hover:text-black">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

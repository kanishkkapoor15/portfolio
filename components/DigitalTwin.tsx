"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Radar, Building2, Cpu, MousePointer2 } from "lucide-react";
import AgentTrace from "./twin/AgentTrace";
import KineticHeading from "./KineticHeading";
import { useRenderActive } from "@/lib/useRenderActive";

const LidarScan = dynamic(() => import("./twin/LidarScan"), { ssr: false, loading: () => null });

const readouts = [
  { label: "Source",  value: "scan-to-BIM · E57" },
  { label: "Points",  value: "24,806" },
  { label: "Storeys", value: "7" },
  { label: "Registration", value: "±4mm" },
];

export default function DigitalTwin() {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  const reduceMotion = useReducedMotion();
  const { ref: activeRef, active } = useRenderActive<HTMLDivElement>();
  // `triggerOnce` latches inView, so it already means "has been approached" —
  // the second WebGL context is never built until the section is reached.
  const mountScan = inView;

  return (
    <section
      id="twin"
      ref={ref}
      className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden bg-[#F6F4EC]"
    >
      <div className="section-blob w-96 h-96 bg-[#1F6B3B] top-10 -right-20" />
      <div className="section-blob w-80 h-80 bg-[#1E7A8C] bottom-0 -left-20" />
      <div className="absolute inset-0 data-grid opacity-40" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#1F6B3B]/20 text-[#1F6B3B] text-sm font-semibold font-mono mb-4">
            <Radar className="w-4 h-4" /> Digital Twin
          </span>
          <KineticHeading
            className="display text-5xl sm:text-7xl text-[#3A2E26] mb-5"
            parts={[
              { text: "Agents that work on " },
              { text: "buildings", className: "bg-gradient-to-r from-[#1F6B3B] to-[#1E7A8C] bg-clip-text text-transparent" },
            ]}
          />
          <p className="text-[#6B5F54] max-w-2xl mx-auto text-lg">
            I build AI agents for built-environment companies across Ireland and the UK —
            reading the models, manuals and sensor streams that real estate actually runs on.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* ── Scan viewport ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, type: "spring", stiffness: 70 }}
            className="lg:col-span-3 relative rounded-2xl overflow-hidden glass border border-[#1F6B3B]/12 min-h-[24rem] h-[24rem] sm:h-[30rem]"
          >
            <div ref={activeRef} className="absolute inset-0">
              {mountScan && <LidarScan paused={!!reduceMotion} active={active} />}
            </div>

            {/* Corner brackets — survey framing */}
            {[
              "top-3 left-3 border-l border-t",
              "top-3 right-3 border-r border-t",
              "bottom-3 left-3 border-l border-b",
              "bottom-3 right-3 border-r border-b",
            ].map((cls) => (
              <div key={cls} className={`absolute w-5 h-5 border-[#1F6B3B]/40 ${cls} pointer-events-none`} />
            ))}

            {/* Live readout */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F6F4EC]/70 backdrop-blur border border-[#1F6B3B]/15 pointer-events-none">
              <Building2 className="w-3.5 h-3.5 text-[#1F6B3B]" />
              <span className="text-[11px] font-mono text-[#6B5F54]">
                point cloud · 7 storeys
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-x-5 gap-y-1 pointer-events-none">
              {readouts.map((r) => (
                <div key={r.label} className="font-mono text-[11px] leading-tight sm:text-[10px]">
                  <span className="text-[#776959]">{r.label} </span>
                  <span className="text-[#6B5F54] tabular-nums">{r.value}</span>
                </div>
              ))}
            </div>

            {/* Affordance — tell people it responds, once */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: [0, 1, 1, 0] } : {}}
              transition={{ duration: 5, times: [0, 0.12, 0.7, 1], delay: 1.2 }}
              className="absolute inset-x-0 bottom-14 flex justify-center pointer-events-none"
            >
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#776959]">
                <MousePointer2 className="w-3 h-3" />
                move to scan
              </span>
            </motion.div>
          </motion.div>

          {/* ── Live agent trace ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, type: "spring", stiffness: 70 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <AgentTrace className="flex-1" />

            <div className="glass rounded-2xl p-5 border border-[#B0512E]/15">
              <p className="text-sm font-semibold text-[#B0512E] mb-2 flex items-center gap-1.5 font-mono">
                <Cpu className="w-4 h-4" /> What that means
              </p>
              <p className="text-sm text-[#6B5F54] leading-relaxed">
                Agents that read IFC models, O&amp;M manuals and BMS telemetry, then take a
                real action — raise the work order, flag the clash, cite the regulation.
                Scoped, evaluated, and shipped against client systems rather than demos.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

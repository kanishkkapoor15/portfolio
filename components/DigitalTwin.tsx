"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Radar, Building2, Cpu, MousePointer2 } from "lucide-react";
import AgentTrace from "./twin/AgentTrace";
import KineticHeading from "./KineticHeading";

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
  const [mountScan, setMountScan] = useState(false);

  // Only build the second WebGL context once the section is actually approached.
  useEffect(() => {
    if (inView) setMountScan(true);
  }, [inView]);

  return (
    <section
      id="twin"
      ref={ref}
      className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden bg-[#050A14]"
    >
      <div className="section-blob w-96 h-96 bg-[#00D4FF] top-10 -right-20" />
      <div className="section-blob w-80 h-80 bg-[#10B981] bottom-0 -left-20" />
      <div className="absolute inset-0 data-grid opacity-40" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#00D4FF]/20 text-[#00D4FF] text-sm font-semibold font-mono mb-4">
            <Radar className="w-4 h-4" /> Digital Twin
          </span>
          <KineticHeading
            className="text-4xl sm:text-5xl font-extrabold text-[#F0F6FF] mb-4"
            parts={[
              { text: "Agents that work on " },
              { text: "buildings", className: "bg-gradient-to-r from-[#00D4FF] to-[#10B981] bg-clip-text text-transparent" },
            ]}
          />
          <p className="text-[#64748B] max-w-2xl mx-auto text-lg">
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
            className="lg:col-span-3 relative rounded-2xl overflow-hidden glass border border-[#00D4FF]/12 min-h-[24rem] h-[24rem] sm:h-[30rem]"
          >
            {mountScan && <LidarScan paused={!!reduceMotion} />}

            {/* Corner brackets — survey framing */}
            {[
              "top-3 left-3 border-l border-t",
              "top-3 right-3 border-r border-t",
              "bottom-3 left-3 border-l border-b",
              "bottom-3 right-3 border-r border-b",
            ].map((cls) => (
              <div key={cls} className={`absolute w-5 h-5 border-[#00D4FF]/40 ${cls} pointer-events-none`} />
            ))}

            {/* Live readout */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#050A14]/70 backdrop-blur border border-[#00D4FF]/15 pointer-events-none">
              <Building2 className="w-3.5 h-3.5 text-[#00D4FF]" />
              <span className="text-[11px] font-mono text-[#94A3B8]">
                point cloud · 7 storeys
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-x-5 gap-y-1 pointer-events-none">
              {readouts.map((r) => (
                <div key={r.label} className="font-mono text-[10px] leading-tight">
                  <span className="text-[#334155]">{r.label} </span>
                  <span className="text-[#64748B] tabular-nums">{r.value}</span>
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
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#475569]">
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

            <div className="glass rounded-2xl p-5 border border-[#7C3AED]/15">
              <p className="text-sm font-semibold text-[#7C3AED] mb-2 flex items-center gap-1.5 font-mono">
                <Cpu className="w-4 h-4" /> What that means
              </p>
              <p className="text-sm text-[#64748B] leading-relaxed">
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

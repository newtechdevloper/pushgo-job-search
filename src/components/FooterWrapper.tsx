"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
    return (
        <section className="py-24 container mx-auto px-6">
            <div className="glass rounded-3xl p-12 md:p-20 text-center relative overflow-hidden border border-cyan-500/30">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-500/5 to-purple-500/5 -z-10"></div>
                <div className="absolute -top-[50%] -left-[10%] w-[500px] h-[500px] bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none"></div>

                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Start Your Career Journey Today</h2>
                <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                    Join the community of 50,000+ professionals building the future.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                        Browse Jobs <ArrowRight size={20} />
                    </button>
                    <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
                        Post a Open Role
                    </button>
                </div>
            </div>
        </section>
    );
}

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-2 md:col-span-1">
                        <span className="text-xl font-bold text-white mb-4 block">Future<span className="text-cyan-400">Job</span></span>
                        <p className="text-gray-500 text-sm">
                            The premier job board for the AI and Web3 era. Connecting talent with the future.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-cyan-400">Browse Jobs</Link></li>
                            <li><Link href="#" className="hover:text-cyan-400">Companies</Link></li>
                            <li><Link href="#" className="hover:text-cyan-400">Salaries</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-cyan-400">Help Center</Link></li>
                            <li><Link href="#" className="hover:text-cyan-400">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-cyan-400">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Social</h4>
                        <div className="flex gap-4">
                            {/* Social Icons Placeholder */}
                            <div className="w-8 h-8 rounded bg-white/10 hover:bg-cyan-500 transition-colors"></div>
                            <div className="w-8 h-8 rounded bg-white/10 hover:bg-cyan-500 transition-colors"></div>
                            <div className="w-8 h-8 rounded bg-white/10 hover:bg-cyan-500 transition-colors"></div>
                        </div>
                    </div>
                </div>
                <div className="text-center text-gray-600 text-sm pt-8 border-t border-white/5">
                    &copy; 2026 FutureJob Inc. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

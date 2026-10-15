import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-[819px] flex items-center justify-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          className="w-full h-full object-cover opacity-40 grayscale" 
          alt="luxury perfume bottle on a dark reflective surface with dramatic golden rim lighting and soft bokeh background" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB72oIwulzsnbVBAS65tFZ6kwk539nr1AfedwlJVyQf2v8Ia42ZcTI8OwC2cmtBoOF2H4HzJ9LlDuahPx7gkRviprMmfzBqQXVvjhJzV7qtFIj-eXfz6YQtUVzl8TIrhcThEvC78z2l19ErTBe60f9QwThAcFnKEFj351KtgXlKBhJ_BDFnhbkNxucqWyjIl2OIOUCmVdgvbp-3KDp3unbijbflB3QBBHJeE0SsfgO9WVhmrQczgNYBphNTzR44f7RICikuk6O_Q5KN"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-[rgba(14,14,14,0.4)] to-transparent"></div>
      </motion.div>
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
          className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
        >
          ✨ Discover Your <span className="gold-gradient-text">Signature Scent</span> ✨
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-on-surface-variant text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md"
        >
          Kurasi wewangian eksklusif untuk setiap karakter. Temukan kemewahan yang berbicara melalui aroma di butik digital kami.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link to="/collections" className="inline-block gold-gradient-bg text-on-primary-fixed px-10 py-4 rounded-full font-headline font-bold text-lg hover:scale-105 transition-transform shadow-[0_4px_20px_rgba(201,168,76,0.3)] hover:shadow-[0_8px_30px_rgba(201,168,76,0.5)]">
            Explore Collection
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

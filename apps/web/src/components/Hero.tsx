import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative h-[819px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          className="w-full h-full object-cover opacity-40 grayscale" 
          alt="luxury perfume bottle on a dark reflective surface with dramatic golden rim lighting and soft bokeh background" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB72oIwulzsnbVBAS65tFZ6kwk539nr1AfedwlJVyQf2v8Ia42ZcTI8OwC2cmtBoOF2H4HzJ9LlDuahPx7gkRviprMmfzBqQXVvjhJzV7qtFIj-eXfz6YQtUVzl8TIrhcThEvC78z2l19ErTBe60f9QwThAcFnKEFj351KtgXlKBhJ_BDFnhbkNxucqWyjIl2OIOUCmVdgvbp-3KDp3unbijbflB3QBBHJeE0SsfgO9WVhmrQczgNYBphNTzR44f7RICikuk6O_Q5KN"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          ✨ Discover Your <span className="gold-gradient-text">Signature Scent</span> ✨
        </h1>
        <p className="text-on-surface-variant text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Kurasi wewangian eksklusif untuk setiap karakter. Temukan kemewahan yang berbicara melalui aroma di butik digital kami.
        </p>
        <Link to="/collections" className="inline-block gold-gradient-bg text-on-primary-fixed px-10 py-4 rounded-full font-headline font-bold text-lg hover:scale-105 transition-transform shadow-xl">
          Explore Collection
        </Link>
      </div>
    </section>
  )
}

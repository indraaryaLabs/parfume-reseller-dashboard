export default function Footer() {
  return (
    <footer className="w-full pt-20 pb-32 bg-[#0E0E0E] border-t border-[#353534]">
      <div className="flex flex-col items-center text-center px-8 w-full max-w-7xl mx-auto">
        <div className="text-xl font-bold text-white mb-4 font-headline tracking-tighter">Parfumé</div>
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          <a className="font-['Inter'] text-sm text-[#8E8E8E] hover:text-white transition-colors" href="#">Tentang Kami</a>
          <a className="font-['Inter'] text-sm text-[#8E8E8E] hover:text-white transition-colors" href="#">Kebijakan Privasi</a>
          <a className="font-['Inter'] text-sm text-[#8E8E8E] hover:text-white transition-colors" href="#">Syarat &amp; Ketentuan</a>
          <a className="font-['Inter'] text-sm text-[#8E8E8E] hover:text-white transition-colors" href="#">Hubungi Kami</a>
        </div>
        <div className="font-['Inter'] text-sm text-[#8E8E8E]">© 2024 Parfumé Digital Curator. Seluruh Hak Cipta Dilindungi.</div>
      </div>
    </footer>
  )
}

export const metadata = {
  title: 'Kapcsolat | Bizánci Forrás Kulturális Egyesület',
  description: 'Az egyesület vezetőségének elérhetőségei.',
}

const contacts = [
  {
    role: 'Elnök',
    name: 'Varga Márta',
    phone: '+36704259991',
    displayPhone: '+36 70 425 9991',
    email: 'vmorthodoxia@gmail.com',
  },
  {
    role: 'Alelnök',
    name: 'Krank Andrea',
    phone: '+36707728258',
    displayPhone: '+36 70 772 8258',
    email: 'krankandrea@gmail.com',
  },
  {
    role: 'Alelnök',
    name: 'Markóczy Magyar Miklós',
    phone: '+36209213827',
    displayPhone: '+36 20 921 3827',
    email: 'markoczym@gmail.com',
  },
]

export default function page() {
  return (
    <div className="bg-[#fcfbf9] text-stone-900 py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Fejléc és központi email cím */}
        <div className="text-center pb-12 border-b border-stone-200">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-amber-800/60" />
            <p className="uppercase tracking-[0.25em] text-xs font-semibold text-amber-900">
              Kapcsolat
            </p>
            <span className="h-px w-8 bg-amber-800/60" />
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-stone-900 tracking-tight mb-6">
            Elérhetőségeink
          </h1>

          <div className="text-stone-700 text-sm md:text-base">
            <p className="font-serif italic text-stone-600 mb-1">
              Az egyesület elektronikus elérhetősége:
            </p>
            <a
              href="mailto:bizanciforras@gmail.com"
              className="font-medium text-amber-900 hover:text-amber-800 text-base md:text-lg border-b border-amber-900/30 hover:border-amber-900 transition-colors"
            >
              bizanciforras@gmail.com
            </a>
          </div>
        </div>

        {/* Vezetőségi névsor és személyes elérhetőségek */}
        <div className="divide-y divide-stone-200">
          {contacts.map((contact) => (
            <div key={contact.email} className="py-10 text-center space-y-2">
              <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold block">
                {contact.role}
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-stone-900 font-normal">
                {contact.name}
              </h2>
              
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-stone-600">
                <div>
                  <span className="text-stone-400 mr-1.5">Tel:</span>
                  <a
                    href={`tel:${contact.phone}`}
                    className="hover:text-stone-950 transition-colors"
                  >
                    {contact.displayPhone}
                  </a>
                </div>
                <span className="hidden sm:inline text-stone-300">•</span>
                <div>
                  <span className="text-stone-400 mr-1.5">Email:</span>
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-amber-900 hover:underline transition-colors"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
export default function Home() {
  return (
    <main className="min-h-screen p-24 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-bold text-blue-600">🚴 Ciclismo Store</h1>
        <p className="mt-6 text-2xl text-gray-600">
          Tu tienda de ciclismo profesional
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-50 rounded-xl">
            <h3 className="text-xl font-bold">🚲 Bicicletas</h3>
            <p className="mt-2 text-gray-600">Las mejores marcas</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl">
            <h3 className="text-xl font-bold">🛡️ Accesorios</h3>
            <p className="mt-2 text-gray-600">Seguridad y confort</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl">
            <h3 className="text-xl font-bold">👕 Ropa</h3>
            <p className="mt-2 text-gray-600">Rendimiento y estilo</p>
          </div>
        </div>
      </div>
    </main>
  );
}
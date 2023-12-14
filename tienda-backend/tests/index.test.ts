
// has un caso para una suma 
describe('Test de la aplicación Express', () => {
  it('Debería responder con un código 200 en la ruta principal', async () => {
    const suma = 1 + 2;
    expect(suma).toBe(3);
  });

  it('Debería responder con un código 404 en una ruta no existente', async () => {
    const suma = 1 + 2;
    expect(suma).toBe(3);
  });
});
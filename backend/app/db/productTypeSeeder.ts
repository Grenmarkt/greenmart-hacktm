import { prismaClient } from './prismaClient.ts';

async function main() {
  await prismaClient.productType.createMany({
    data: [
      // VEGETABLE
      { name: 'Rosii Cherry Bio', category: 'VEGETABLE' },
      { name: 'Castraveti Sera Bio', category: 'VEGETABLE' },
      { name: 'Ardei Gras Rosu Bio', category: 'VEGETABLE' },

      // FRUIT
      { name: 'Mere Ionatan Bio', category: 'FRUIT' },
      { name: 'Pere Williams Bio', category: 'FRUIT' },
      { name: 'Cirese Pata Negra Bio', category: 'FRUIT' },

      // MEAT
      { name: 'Pui de Tara Bio', category: 'MEAT' },
      { name: 'Carne de Porc Bio', category: 'MEAT' },
      { name: 'Miel de Tara Bio', category: 'MEAT' },

      // DAIRY
      { name: 'Branza de Vaci Bio', category: 'DAIRY' },
      { name: 'Lapte de Tara Bio', category: 'DAIRY' },
      { name: 'Iaurt de Casa Bio', category: 'DAIRY' },

      // BEVERAGE
      { name: 'Suc de Mere 100% Bio', category: 'BEVERAGE' },
      { name: 'Kombucha Taranesca Bio', category: 'BEVERAGE' },
      { name: 'Limonada cu Mure Bio', category: 'BEVERAGE' },
    ],
  });

  console.log('Seed pentru tabelul ProductType finalizat 🎉');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });

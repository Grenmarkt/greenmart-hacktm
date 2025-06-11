import { Categories } from "@/data/categories";

const CategoryGrid = () => {
  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">Categorii principale</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 justify-items-center">
        {Categories.map((cat) => (
          <div
            key={cat.label}
            className="flex flex-col items-center text-center w-full max-w-[100px]"
          >
            <img
              src={cat.image.src}
              alt={cat.image.alt}
              className="w-20 h-20 object-cover rounded-full border shadow"
            />
            <p className="mt-2 text-sm">{cat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;

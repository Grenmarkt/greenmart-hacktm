import React from "react";
import { Star, ShoppingCart } from "lucide-react";

type CardPopUpProps = {
  image: string;
  name: string;
  quantity: string;
  price: string;
  rating?: number;
  onAddToCart?: () => void;
};

const CardPopUp: React.FC<CardPopUpProps> = ({
  image,
  name,
  quantity,
  price,
  rating,
  onAddToCart,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col w-36 h-64 ">
    
      <div className="w-full">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      <div className="p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-800 truncate overflow-hidden whitespace-nowrap">{name}</h3>
          <p className="text-xs text-gray-500 mt-1">{quantity}</p>
          <p className="text-sm text-green-600 font-bold mt-1">{price}</p>

          {typeof rating === "number" && (
            <div className="flex items-center gap-0.5 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
          <button
          onClick={onAddToCart}
          className="mt-4 bg-green-600 text-white text-xs py-1.5 px-3 rounded hover:bg-green-700 transition w-fit flex items-center gap-1"
        >
          <ShoppingCart className="w-4 h-4" />
          Adaugă în coș
        </button>
        </div>
      </div>
    </div>
  );
};

export default CardPopUp;

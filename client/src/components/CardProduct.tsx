const CardProduct = ({ product }: { product: any }) => {
  return (
    <div className="flex flex-col items-center justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-zinc-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={product.image}
            alt={product.name}
            className="h-12 w-12 rounded-full"
          />
          <div>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm opacity-50">{product.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">${product.price}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Add to Cart
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm opacity-50">
          ${product.price * product.quantity}
        </p>
        <p className="text-sm font-semibold">{product.quantity} in stock</p>
      </div>
    </div>
  );
};

export default CardProduct;

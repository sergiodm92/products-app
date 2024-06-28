import Table from "@components/Table";

const SectionProducts = () => {
  const data = [
    {
      id: '1',
      name: '1',
      price: 'user1',
      description: 'John',
      category: 'Doe',
      image: 'Male',
      rating: 'password1',
      stock: 'Active',
    },
  {
    id: '1',
    name: '1',
    price: 'user1',
    description: 'John',
    category: 'Doe',
    image: 'Male',
    rating: 'password1',
    stock: 'Active',
  },
  {
    id: '1',
    name: '1',
    price: 'user1',
    description: 'John',
    category: 'Doe',
    image: 'Male',
    rating: 'password1',
    stock: 'Active',
  }
  ];
  
  const columns = [
    { key: 'id', name: 'ID' },
    { key: 'name', name: 'NAME' },
    { key: 'price', name: 'PRICE' },
    { key: 'description', name: 'DESCRIPTION' },
    { key: 'category', name: 'STOCK' },
    { key: 'image', name: 'IMAGE' },
    { key: 'rating', name: 'RATING' },
    { key: 'stock', name: 'STOCK' },
  ];
  
  const handleRowClick = () => {
    console.log('Row clicked with key:');
  };
  return (
    <section className="container w-full justify-center">
      <Table data={data} columns={columns}/>
    </section>
  );
};

export default SectionProducts;

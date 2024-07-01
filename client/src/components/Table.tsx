"use client";
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";
import { TableProps } from "@/interfaces/table.interfaces";
import React, { useState } from "react";
import { DetailModal } from "@components/index";

export const Table: React.FC<TableProps> = ({ data, columns }) => {
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const calculateAverage = (arr: number[]): number => {
    if (!Array.isArray(arr) || arr.length === 0) return 0;
    const sum = arr.reduce((acc, val) => acc + val, 0);
    return sum / arr.length;
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsStarFill key={`full-${i}`} className="text-primaryDark" />);
    }

    if (halfStar) {
      stars.push(<BsStarHalf key="half" className="text-primaryDark" />);
    }

    for (let i = 0; i < 5 - fullStars - Number(halfStar); i++) {
      stars.push(<BsStar key={`empty-${i}`} className="text-primaryDark" />);
    }

    return stars;
  };

  const handleRowClick = (product: any) => {
    setSelectedProduct(product);
    setIsOpenDetail(true);
  };

  return (
    <section className="dark:bg-dark py-10 w-full transition-all duration-300">
      <div className="container">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full">
            <div className="max-w-full overflow-x-auto rounded-lg border-primaryLight border-2">
              <table className="w-full table-auto">
                <thead className="text-center bg-primaryDark/80">
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column.key}
                        className="w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-4 lg:px-4"
                      >
                        {column.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={`${
                        rowIndex % 2 === 0 ? "bg-primaryLight" : "bg-primary"
                      } hover:opacity-80 transition-all duration-300 cursor-pointer`}
                      onClick={() => handleRowClick(row)}
                    >
                      {columns.map((column) => (
                        <td
                          key={column.key}
                          className={`text-dark border-b border-l text-sm border-[#E8E8E8] text-center px-2 py-5 dark:text-dark-7 ${
                            rowIndex % 2 === 0
                              ? "bg-primaryLight"
                              : "bg-primary"
                          }`}
                        >
                          {column.key === "ratings" ? (
                            <div className="flex justify-center">
                              {renderStars(calculateAverage(row[column.key]))}
                            </div>
                          ) : column.key === "image" ? (
                            <div className="flex items-center justify-center p-2 bg-white rounded-lg">
                              <img
                                src={
                                  row[column.key]
                                    ? row[column.key]
                                    : "https://focaris.com.ar/wp-content/plugins/ecommerce-product-catalog/img/no-default-thumbnail.png"
                                }
                                className="rounded-lg max-h-[100px] max-w-[100px]"
                                alt="Product Image"
                              />
                            </div>
                          ) : (
                            row[column.key]
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {selectedProduct && (
              <DetailModal
                data={selectedProduct}
                isOpen={isOpenDetail}
                onClose={() => setIsOpenDetail(false)}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

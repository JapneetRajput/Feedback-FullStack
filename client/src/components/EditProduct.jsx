import React, { useEffect, useState } from "react";
import TextBox from "./TextBox";
import Axios from "axios";

const EditProduct = ({ toggleModal, product }) => {
  console.log(product);
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [logoUrl, setLogoUrl] = useState(product.logoUrl);
  const [productUrl, setProductUrl] = useState(product.productUrl);
  const [description, setDescription] = useState(product.description);

  const handleProductFormSubmit = (event) => {
    event.preventDefault();
    let token = localStorage.getItem("token");
    if (name && category && logoUrl && productUrl && description) {
      const productt = {
        id: product._id,
        name: name,
        category: category,
        logoUrl: logoUrl,
        productUrl: productUrl,
        description: description,
      };
      setName("");
      setCategory("");
      setLogoUrl("");
      setProductUrl("");
      setDescription("");
      const config = {
        headers: {
          authorization: token,
        },
      };
      Axios.put(
        process.env.REACT_APP_API_BASE_URL + "/api/products/edit",
        productt,
        config
      )
        .then((res) => {
          alert("Product edited successfully");
          toggleModal();
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      alert("All fields are mandatory!");
    }
  };
  return (
    <form
      onSubmit={handleProductFormSubmit}
      className="flex flex-col items-start mx-16 sm:mt-16 mt-4"
    >
      <p className="sm:text-2xl text-xl font-bold text-bluePrimary">
        Edit product
      </p>

      <TextBox
        textInput="text-md text-bluePrimary"
        textLabel="text-md text-bluePrimary"
        width="w-full"
        height="sm:h-12 h-12"
        hint="Name of the company"
        backgroundColor="bg-white"
        position="left-2 md:left-3 sm:top-2.5 top-3"
        border="border-gray border-2"
        span="px-1 text-sm"
        input="px-3 md:px-4"
        div="sm:mt-6 mt-8"
        setState={setName}
        value={name}
        type="text"
      />
      <TextBox
        textInput="text-md text-bluePrimary"
        textLabel="text-md text-bluePrimary"
        width="w-full"
        height="sm:h-12 h-12"
        hint="Category"
        backgroundColor="bg-white"
        position="left-2 md:left-3 sm:top-2.5 top-3"
        border="border-gray border-2"
        span="px-1 text-sm"
        input="px-3 md:px-4"
        div="sm:mt-4 mt-6"
        setState={setCategory}
        value={category}
        type="text"
      />
      <TextBox
        textInput="text-md text-bluePrimary"
        textLabel="text-md text-bluePrimary"
        width="w-full"
        height="sm:h-12 h-12"
        hint="Add logo url"
        backgroundColor="bg-white"
        position="left-2 md:left-3 sm:top-2.5 top-3"
        border="border-gray border-2"
        span="px-1 text-sm"
        input="px-3 md:px-4"
        div="sm:mt-4 mt-6"
        setState={setLogoUrl}
        value={logoUrl}
        type="text"
      />
      <TextBox
        textInput="text-md text-bluePrimary"
        textLabel="text-md text-bluePrimary"
        width="w-full"
        height="sm:h-12 h-12"
        hint="Link of product"
        backgroundColor="bg-white"
        position="left-2 md:left-3 sm:top-2.5 top-3"
        border="border-gray border-2"
        span="px-1 text-sm"
        input="px-3 md:px-4"
        div="sm:mt-4 mt-6"
        setState={setProductUrl}
        value={productUrl}
        type="text"
      />
      <TextBox
        textInput="text-md text-bluePrimary"
        textLabel="text-md text-bluePrimary"
        width="w-full"
        height="sm:h-12 h-12"
        hint="Add description"
        backgroundColor="bg-white"
        position="left-2 md:left-3 sm:top-2.5 top-3"
        border="border-gray border-2"
        span="px-1 text-sm"
        input="px-3 md:px-4"
        div="sm:mt-4 mt-6"
        setState={setDescription}
        value={description}
        type="text"
      />
      <button
        type="submit"
        className="mt-6 ml-4 bg-bluePrimary text-white px-6 py-2 rounded-2xl"
      >
        + Edit
      </button>
    </form>
  );
};

export default EditProduct;

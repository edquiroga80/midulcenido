import React from "react";
import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Bienvenidos a MiDulceNido",
  description: "La mejor ropa infantil y para bebes!",
  keywords: "ropa de bebe, bebes, ropa infantil",
};

export default Meta;

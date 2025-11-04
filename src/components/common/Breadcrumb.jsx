import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="text-sm mb-4">
      {items.map((item, index) => (
        <span key={index}>
          {item.path ? (
            <Link to={item.path} className="text-blue-500 hover:underline">
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
          {index < items.length - 1 && " > "}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;

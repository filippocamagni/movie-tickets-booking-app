import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      style={{ margin: "8rem 0", textAlign: "center" }}
    >
      <p>Page not found.</p>
      <Link to={"/"}>
        <button className="btn-main mt-2">Go back</button>
      </Link>
    </motion.div>
  );
};

export default NotFound;

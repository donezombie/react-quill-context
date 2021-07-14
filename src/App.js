import React, { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./App.css";

const getAllAttributes = (el) =>
  el.getAttributeNames().reduce(
    (obj, name) => ({
      ...obj,
      [name]: el.getAttribute(name),
    }),
    {}
  );

function App() {
  const refQuill = useRef(null);
  const [value, setValue] = React.useState(
    '<p><img src="https://deviet.vn/wp-content/uploads/2019/04/vuong-quoc-anh.jpg"><p>123123</p><img src="https://avi.edu.vn/wp-content/uploads/2019/11/london-2393098.jpg"></p>'
  );

  const handleMenuFile = (e) => {
    e.preventDefault();
    const alt = window.prompt("Alt?:");
    const allCurrentAttr = getAllAttributes(e.target);
    const { src } = allCurrentAttr;

    const newValue = value.replace(
      new RegExp(`src="${src}"`),
      `src="${src}" alt="${alt}"`
    );
    e.target.setAttribute("alt", alt);
    setValue(newValue);
  };

  React.useEffect(() => {
    if (refQuill.current) {
      const imgsEditor =
        refQuill.current.editingArea.getElementsByTagName("img");
      for (let imgEle of imgsEditor) {
        imgEle.addEventListener("contextmenu", handleMenuFile);
      }
    }

    return () => {
      const imgsEditor =
        refQuill.current.editingArea.getElementsByTagName("img");
      for (let imgEle of imgsEditor) {
        imgEle.removeEventListener("contextmenu", handleMenuFile);
      }
    };
  }, [value]);

  console.log({ value });

  return (
    <ReactQuill ref={refQuill} theme="snow" value={value} onChange={setValue} />
  );
}

export default App;

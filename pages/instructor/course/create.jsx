import { useState } from "react";
import InstuctorRoute from "../../../components/routes/InstructorRoute";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const CreateCourse = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: 9.99,
    uploading: false,
    paid: false,
    loading: false,
    category: "",
  });
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("");
  const router = useRouter();
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setValues({ ...values, loading: true });
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name);

    Resizer.imageFileResizer(
      file,
      720,
      500,
      "JPEG",
      100,
      0,
      async (url) => {
        try {
          setLoading(true);
          let { data } = await axios.post("/api/image-upload", {
            image: url,
          });
          console.log(data);
          setValues({ ...values, loading: false });
          setImage(data);
          setLoading(false);
        } catch (error) {
          console.log(error.response);
          setLoading(false);
          toast("ERROR, IMAGE NOT UPLOADED");
          setValues({ ...values, loading: false });
        }
      },
      "base64"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/course", { ...values, image });
      router.push("/instructor");
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleImageRemove = async () => {
    try {
      const res = await axios.post("/api/remove-image", {
        image,
      });
      setImage({});
      setPreview("");
      setUploadButtonText("Upload Image");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <InstuctorRoute>
      <h1>Create Course</h1>
      <form>
        <label style={{ width: "100%" }}>
          <span>Course name</span>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={(e) => handleChange(e)}
          />
          <label style={{ width: "100%" }}>
            <span>Course free or paid</span>
            <select
              onChange={(e) => {
                setValues({
                  ...values,
                  paid: JSON.parse(e.target.value),
                  price: 0,
                });
              }}
            >
              <option value={false}>Free</option>
              <option value={true}>Paid</option>
            </select>
          </label>
        </label>
        {values.paid === true && (
          <label style={{ width: "100%" }}>
            <span>Price</span>
            <input
              type="number"
              name="price"
              value={values.price}
              onChange={(e) => handleChange(e)}
            />
          </label>
        )}
        <label style={{ width: "100%" }}>
          <span>Description</span>
          <input
            type="text"
            name="description"
            value={values.description}
            onChange={(e) => handleChange(e)}
          />
        </label>

        {loading ? (
          "UPLOADING..."
        ) : (
          <>
            <label style={{ width: "100%" }}>
              <span>{image.Key ? image.Key : "Upload Image"}</span>
              <div
                style={{
                  backgroundColor: "green",
                  borderRadius: "20px",
                  width: "100%",
                  height: "20px",
                  marginTop: "-20px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <input
                  type="file"
                  name="image"
                  onChange={(e) => handleImage(e)}
                  accept="image/*"
                  hidden
                />
              </div>
            </label>
            {preview && (
              <div>
                <div
                  style={{
                    backgroundColor: "red",
                    width: "20px",
                    textAlign: "center",
                    position: "absolute",
                    cursor: "pointer",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: "100%",
                  }}
                  onClick={() => handleImageRemove()}
                >
                  X
                </div>
                <img src={preview} style={{ width: "150px" }} />
              </div>
            )}
          </>
        )}

        <label style={{ width: "100%" }}>
          <span>category</span>
          <input
            type="text"
            name="category"
            value={values.category}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <button onClick={(e) => handleSubmit(e)}>SUBMIT & Continue</button>
      </form>
      <pre>{JSON.stringify(values, null, 4)}</pre>
      <pre>{JSON.stringify(image, null, 4)}</pre>
    </InstuctorRoute>
  );
};

export default CreateCourse;

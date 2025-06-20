import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";

interface Props {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  return (
    <Formik
      initialValues={{ topic: "" }}
      onSubmit={(values, actions) => {
        if (!values.topic.trim()) {
          toast.error("Введіть запит для пошуку зображень");
          return;
        }

        onSearch(values.topic);
        actions.resetForm();
      }}
    >
      <Form>
        <Field
          type="text"
          name="topic"
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
}

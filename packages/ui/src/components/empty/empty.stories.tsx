import { EMPTY_GALLERY_TYPES, Empty } from "./index";

export default {
  title: "YD Design System/Empty",
  parameters: { layout: "padded" },
};

export const Default = {
  render: () => <Empty />,
};

export const Inspection = {
  render: () => <Empty type="inspection" />,
};

export const Gallery = {
  name: "Illustration Gallery",
  render: () => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {EMPTY_GALLERY_TYPES.map((type) => (
        <div key={type} className="rounded-lg border p-4">
          <Empty type={type} />
        </div>
      ))}
    </div>
  ),
};

import React, { useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import { Avatar } from "ui";
import { Button } from "flowbite-react";
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const TestModals = () => {
  const [showModal, setModal] = useState(false);


  return (
    <div>
      <div>
        <button
          type="button"
          className="bg-blue-400 active:bg-black hover:bg-black"
          onClick={() => setModal(true)}
        >
          open modal
        </button>
      </div>
      {showModal ? (
        <div className="mt-10 flex justify-center items-center flex-col w-4/5 rounded-lg shadow-xl h-auto p-2">
          {/* <!-- Hiển thị tên studio --> */}
          <div className="flex flex-row overflow-visible w-0 min-w-full">
            <div className="flex justify-between items-center py-4 px-10">
              <div className="flex items-center">
                <div>
                  <Avatar size={50} src={`images`} alt={`avatar`} />
                </div>
                <div className="flex flex-row ltr:ml-6 rtl:mr-6 ">
                  <div className="hidden sm:inline-block text-base flex flex-row  font-medium ml-2">
                    <p className="ltr:mr-2 rtl:ml-2 font-bold">
                      Studio nameaaaaaaaa
                    </p>
                    <span className="ltr:mr-2 rtl:ml-2 text-sm ">
                      Artist firstName
                    </span>
                  </div>
                  <p className="mt-2 font-hairline text-sm">
                    {/* 123,456 {t("followers")} */}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Hiển thị form--> */}
          <div className=" overflow-y-auto min-w-full py-4 px-10">
            <h2 className="text-2xl font-bold mb-4">Buổi hẹn của bạn sẽ là:</h2>
            <form>
              <div className="rounded-lg shadow-sm">
                <div className="block mb-3">
                  <label className=" text-lg">Mô tả ý tưởng</label>
                  <textarea
                    //   aria-label={t("fullName")}
                    name="name"
                    required
                    className=" mt-4 mb-4 text-base appearance-none h-20 relative block w-full px-3 py-3 ring-1 ring-gray-300 dark:ring-gray-600 ring-opacity-80 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-none"
                    placeholder="Ví dụ: Tôi muốn hình xăm máy bay giấy kích thước vào khoảng 3-5cm và được xăm theo phong cách tối giản "
                  />
                 
                </div>
              </div>
              <h2 className="text-lg mb-4">Hình tham khảo:</h2>
              {/* thêm hình ảnh */}
              <div className="flex">
                <div>
                  <Button
                    onSuccess={(result, options) =>
                      handleUploadImage(result, options, stageIndex)
                    }
                    className="mb-4 text-black bg-blue-100 hover:bg-blue-400 font-medium rounded-lg text-sm py-2 px-2 w-full dark:bg-indigo-600 dark:hover:bg-indigo-500 focus:outline-none dark:focus:ring-blue-800"
                    uploadPreset={UPLOAD_PRESET}
                  >
                    + Thêm hình
                  </Button>
                </div>
              </div>
              {/* hiện hình ảnh */}

              <h2 className="text-lg mb-4">Thời gian</h2>
              <select
                id="countries"
                class="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="US">Vài ngày tới</option>
                <option value="CA">Tuần sau</option>
                <option value="FR">Vài tuần sau</option>
                <option value="DE">Trong vài tháng tới</option>
              </select>
              <h2 className="text-lg mb-4">Giá dịch vụ ước tính</h2>
              

            </form>
          </div>

          <div className="flex gap-5">
            <button
              className="my-5 w-auto px-8 h-10 bg-red-400 text-white rounded-md"
              onClick={() => setModal(false)}
            >
              Đóng
            </button>
            <button
              className="my-5 w-auto px-8 h-10 bg-green-400 text-white rounded-md"
              onClick={() => setModal(false)}
            >
              Đặt lịch hẹn
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TestModals;

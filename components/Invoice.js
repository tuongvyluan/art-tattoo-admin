import { Card, Loading } from "ui";
import { fetcher, formatPrice } from "lib";

import useSWR from "swr";
import { useTranslation } from "i18n";

const Invoice = () => {
  const { t } = useTranslation("invoice");
  const { data, error } = useSWR(`/api/invoice`, fetcher);
  const tax = 15;
  const getSubTotal = () =>
    data
      ? data.items.reduce((sum, item) => sum + item.quantity * item.price, 0)
      : 0;

  const getCalculatedTax = () => (tax * getSubTotal()) / 100;

  const getTotal = () => getSubTotal() + getCalculatedTax();

  if (error)
    return (
      <div className="flex items-center justify-center h-full">
        Failed to load media data
      </div>
    );
  if (!data)
    return (
      <div className="flex items-center justify-center h-full">
        <Loading />
      </div>
    );

  return (
    <div>
      <div className="bg-indigo-500 text-white p-5 mb-3 -mx-4 -my-4">
        <div className="p-8">
          <h1 className="font-medium text-xl">{data.receiver.company}</h1>
          <div className="flex flex-col sm:flex-row">
            <div className="ltr:mr-auto rtl:ml-auto">
              <ul className="list-none">
                <li>{data.receiver.name}</li>
                <li>{data.receiver.email}</li>
              </ul>
              <ul className="list-none">
                <li>
                  {data.receiver.location.street.number}{" "}
                  {data.receiver.location.street.name}
                </li>
                <li>{data.receiver.location.city}</li>
                <li>{data.receiver.location.state}</li>
                <li>{data.receiver.location.country}</li>
                <li>{data.receiver.location.postcode}</li>
              </ul>
              <ul className="list-none">
                <li>Invoice #{data.id}</li>
                <li>{data.createdAt}</li>
              </ul>
            </div>
            <div className="sm:ltr:text-right sm:rtl:text-left pt-3 sm:pt-0">
              <ul className="list-none">
                <li>{data.sender.company}</li>
                <li>{data.sender.name}</li>
                <li>{data.sender.email}</li>
              </ul>
              <ul className="list-none">
                <li>
                  {data.sender.location.street.number}{" "}
                  {data.sender.location.street.name}
                </li>
                <li>{data.sender.location.city}</li>
                <li>{data.sender.location.state}</li>
                <li>{data.sender.location.country}</li>
                <li>{data.sender.location.postcode}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Card>
        <div className="rounded-b-lg p-5">
          <div className="p-5">
            <div className="flex py-2 text-gray-500 border-b border-t items-center border-solid border-gray-100 dark:border-gray-700">
              <div className="ltr:mr-auto rtl:ml-auto">
                <small>{t("description")}</small>
              </div>
              <div className="ltr:text-right rtl:text-left">
                <small>{t("amount")}</small>
              </div>
            </div>

            {data.items.map((item, index) => (
              <div
                className="flex py-4 border-b border-solid border-gray-100 dark:border-gray-700 items-center"
                key={index}
              >
                <div className="ltr:mr-auto rtl:ml-auto">
                  <span>{item.title}</span>
                  <small className="block text-gray-500">
                    {item.subtitle}
                    {item.quantity && (
                      <span>
                        &nbsp;*&nbsp;
                        {item.quantity}
                      </span>
                    )}
                  </small>
                </div>
                <div className="ltr:text-right rtl:text-left">
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              </div>
            ))}

            <div className="flex">
              <div
                className="block ltr:ml-auto rtl:mr-auto w-full"
                style={{ maxWidth: "400px" }}
              >
                <div className="flex py-4 border-b border-solid border-gray-100 dark:border-gray-700 items-center">
                  <small className="ltr:mr-auto rtl:ml-auto text-gray-500">
                    {t("subtotal")}
                  </small>
                  <span className="ltr:text-right rtl:text-left">
                    {formatPrice(getSubTotal())}
                  </span>
                </div>
                <div className="flex py-4 border-b border-t border-solid border-gray-100 dark:border-gray-700 items-center">
                  <small className="ltr:mr-auto rtl:ml-auto text-gray-500">
                    {t("tax")}
                  </small>
                  <span>
                    <small className="text-gray-500">@ {tax}% - </small>
                    <span>{formatPrice(getCalculatedTax())}</span>
                  </span>
                </div>
                <div className="flex py-4 border-t border-solid border-gray-100 dark:border-gray-700 items-center">
                  <small className="ltr:mr-auto rtl:ml-auto text-gray-500">
                    {t("discount")}
                  </small>
                  <span>
                    <small className="text-gray-500">0% off - </small>
                    <span>{formatPrice(0)}</span>
                  </span>
                </div>
                <div className="flex py-4 border-b border-t border-solid border-blue-500 items-center">
                  <small className="ltr:mr-auto rtl:ml-auto text-gray-500">
                    {t("total")}
                  </small>
                  <strong>{formatPrice(getTotal())}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Invoice;

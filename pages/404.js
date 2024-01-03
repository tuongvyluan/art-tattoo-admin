import { Link, Ripple } from "ui";

import Illustration from "public/images/illustrations/undraw_filing_system_b5d2.svg";

const NotFound = () => (
  <div className="flex flex-col justify-center items-center min-h-screen w-full text-center">
    <div className="w-full">
      <Illustration width={300} height={300} className="inline-block" />
      <h1
        className={`text-yellow-500 text-4xl mb-0 font-bold leading-none uppercase`}
      >
        Error 404
      </h1>
      <h6 className="mt-0 mb-2">Sorry! 404 </h6>
      <Link prefetch={false} href="/" as={``}>
        <a className="relative inline-flex justify-center rounded-lg border border-transparent px-4 py-3 bg-white text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 text-sm leading-none">
          Go back home
          <Ripple />
        </a>
      </Link>
    </div>
  </div>
);

export default NotFound;

import { Footer as FlowbitFooter } from "flowbite-react";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";

import logo from "@/assets/images/logo-1.png";

export default function Footer() {
  return (
    <FlowbitFooter
      className="mt-10 container mx-auto w-full border-t border-primary-sunset rounded-none shadow-none"
      container
      theme={{
        groupLink: {
          base: "flex flex-wrap text-sm text-gray-500",
          link: {
            base: "me-4 last:mr-0 md:mr-6",
            href: "hover:underline",
          },
        },
      }}
    >
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <FlowbitFooter.Brand
              href="/"
              src={logo}
              alt="Logo"
              name="TRENDORA"
              className="font-playfair text-3xl"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FlowbitFooter.Title
                className="font-bold text-base text-gray-800"
                title="about"
              />
              <FlowbitFooter.LinkGroup col>
                <FlowbitFooter.Link
                  href="#"
                  className="hover:text-primary-default transition-all ease-in-out duration-200"
                >
                  Trendora
                </FlowbitFooter.Link>
                <FlowbitFooter.Link
                  href="#"
                  className="hover:text-primary-default transition-all ease-in-out duration-200"
                >
                  Categories
                </FlowbitFooter.Link>
                <FlowbitFooter.Link
                  href="#"
                  className="hover:text-primary-default transition-all ease-in-out duration-200"
                >
                  Products
                </FlowbitFooter.Link>
                <FlowbitFooter.Link
                  href="#"
                  className="hover:text-primary-default transition-all ease-in-out duration-200"
                >
                  Brands
                </FlowbitFooter.Link>
              </FlowbitFooter.LinkGroup>
            </div>
            <div>
              <FlowbitFooter.Title
                className="font-bold text-base text-gray-800"
                title="Follow us"
              />
              <FlowbitFooter.LinkGroup col>
                <FlowbitFooter.Link
                  href="#"
                  className="hover:text-primary-default transition-all ease-in-out duration-200"
                >
                  Facebook
                </FlowbitFooter.Link>
                <FlowbitFooter.Link
                  href="#"
                  className="hover:text-primary-default transition-all ease-in-out duration-200"
                >
                  Instgram
                </FlowbitFooter.Link>
                <FlowbitFooter.Link
                  href="#"
                  className="hover:text-primary-default transition-all ease-in-out duration-200"
                >
                  Youtube
                </FlowbitFooter.Link>
              </FlowbitFooter.LinkGroup>
            </div>
            <div>
              <FlowbitFooter.Title
                className="font-bold text-base text-gray-800"
                title="Legal"
              />
              <FlowbitFooter.LinkGroup col>
                <FlowbitFooter.Link
                  href="#"
                  className="hover:text-primary-default transition-all ease-in-out duration-200"
                >
                  Privacy Policy
                </FlowbitFooter.Link>
                <FlowbitFooter.Link
                  href="#"
                  className="hover:text-primary-default transition-all ease-in-out duration-200"
                >
                  Terms &amp; Conditions
                </FlowbitFooter.Link>
              </FlowbitFooter.LinkGroup>
            </div>
          </div>
        </div>
        <FlowbitFooter.Divider className="border-primary-peach" />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FlowbitFooter.Copyright
            href="#"
            className="hover:text-primary-default transition-all ease-in-out duration-200"
            by="Trendora™"
            year={new Date().getFullYear()}
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FlowbitFooter.Icon
              href="#"
              className="hover:text-primary-default transition-all ease-in-out duration-200"
              icon={BsFacebook}
            />
            <FlowbitFooter.Icon
              href="#"
              className="hover:text-primary-default transition-all ease-in-out duration-200"
              icon={BsInstagram}
            />
            <FlowbitFooter.Icon
              href="#"
              className="hover:text-primary-default transition-all ease-in-out duration-200"
              icon={BsTwitter}
            />
            <FlowbitFooter.Icon
              href="#"
              className="hover:text-primary-default transition-all ease-in-out duration-200"
              icon={BsYoutube}
            />
          </div>
        </div>
      </div>
    </FlowbitFooter>
  );
}

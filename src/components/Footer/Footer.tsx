import { Footer as FlowbitFooter } from "flowbite-react";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";

import logo from "@/assets/images/logo-1.png";
import android from "@/assets/images/get-google-play.png";
import ios from "@/assets/images/get-apple-store.png";
import amazon from "@/assets/images/amazon-pay.png";
import paypal from "@/assets/images/paypal.png";
import mastercard from "@/assets/images/mastercard.webp";
import amazonExpress from "@/assets/images/American-Express-Color.png";

export default function Footer() {
  return (
    <FlowbitFooter
      className="mt-10 rounded-none shadow-none bg-gradient-to-r from-gray-100 to-gray-300 text-gray-800"
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
      <div className="w-full container mx-auto">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <FlowbitFooter.Brand
              href="/"
              src={logo}
              alt="Logo"
              name="TRENDORA"
              loading="lazy"
              className="font-playfair text-3xl"
            />

            <FlowbitFooter.Divider className="border-primary-peach" />

            <div className="flex justify-center items-center sm:flex-col sm:items-start lg:flex-row lg:items-center gap-2">
              <h5 className="text-xs font-bold uppercase">Download Our App</h5>

              <a href="#0">
                <img
                  className="w-24"
                  src={android}
                  alt="Get App On Play Store"
                  loading="lazy"
                />
              </a>

              <a href="#0">
                <img
                  className="w-[86px]"
                  src={ios}
                  alt="Get App On Apple Store"
                  loading="lazy"
                />
              </a>
            </div>

            <FlowbitFooter.Divider className="border-primary-peach sm:hidden" />
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
                  Shop
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

        <div className="flex justify-center items-center flex-col gap-2 flex-wrap">
          <h5 className="text-xs font-bold uppercase w-full">
            Our Payment Partners
          </h5>

          <div className="grid grid-cols-4 gap-4 items-center">
            <img
              className="w-20"
              src={amazon}
              alt="Amazon Pay"
              loading="lazy"
            />
            <img
              className="w-20"
              src={amazonExpress}
              alt="Amazon Express"
              loading="lazy"
            />
            <img className="w-20" src={paypal} alt="Paypal" loading="lazy" />
            <img
              className="w-20"
              src={mastercard}
              alt="Mastercard"
              loading="lazy"
            />
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

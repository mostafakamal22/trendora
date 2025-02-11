import { Footer as FlowbitFooter } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

import logo from "@/assets/images/logo-1.png";

export default function Footer() {
  return (
    <FlowbitFooter container>
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <FlowbitFooter.Brand
              href="/"
              src={logo}
              alt="Logo"
              name="TRENDORA"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FlowbitFooter.Title title="about" />
              <FlowbitFooter.LinkGroup col>
                <FlowbitFooter.Link href="#">Trendora</FlowbitFooter.Link>
                <FlowbitFooter.Link href="#">Tailwind CSS</FlowbitFooter.Link>
              </FlowbitFooter.LinkGroup>
            </div>
            <div>
              <FlowbitFooter.Title title="Follow us" />
              <FlowbitFooter.LinkGroup col>
                <FlowbitFooter.Link href="#">Github</FlowbitFooter.Link>
                <FlowbitFooter.Link href="#">Discord</FlowbitFooter.Link>
              </FlowbitFooter.LinkGroup>
            </div>
            <div>
              <FlowbitFooter.Title title="Legal" />
              <FlowbitFooter.LinkGroup col>
                <FlowbitFooter.Link href="#">Privacy Policy</FlowbitFooter.Link>
                <FlowbitFooter.Link href="#">
                  Terms &amp; Conditions
                </FlowbitFooter.Link>
              </FlowbitFooter.LinkGroup>
            </div>
          </div>
        </div>
        <FlowbitFooter.Divider className="border-primary-peach" />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FlowbitFooter.Copyright href="#" by="Trendora™" year={2022} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FlowbitFooter.Icon href="#" icon={BsFacebook} />
            <FlowbitFooter.Icon href="#" icon={BsInstagram} />
            <FlowbitFooter.Icon href="#" icon={BsTwitter} />
            <FlowbitFooter.Icon href="#" icon={BsGithub} />
            <FlowbitFooter.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </FlowbitFooter>
  );
}

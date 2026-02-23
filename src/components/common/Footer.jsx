import React from "react";
import { Link } from "react-router-dom";
import { CiFacebook } from "react-icons/ci";
import { RiGoogleLine } from "react-icons/ri";
import { FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../../assets/Logo/Logo-Small-Light.png";
import { FooterLink2 } from "../../data/footer-links";

// ✅ FIX: Converted social-media buttons from <button onClick={window.open(...)}>
// to proper <a> tags with target="_blank" and rel="noopener noreferrer".
// 1. <a> is semantically correct for navigation; screen readers announce it properly.
// 2. rel="noopener noreferrer" prevents the new tab from accessing `window.opener`,
//    which is a known security vector (reverse tabnapping).
const socialLinks = [
  {
    icon: <CiFacebook />,
    link: "https://www.facebook.com",
    label: "Facebook",
  },
  {
    icon: <RiGoogleLine />,
    link: "https://www.google.com",
    label: "Google",
  },
  {
    icon: <FaTwitter />,
    link: "https://x.com/suraj2020kmr",
    label: "Twitter",
  },
  {
    icon: <FaYoutube />,
    link: "https://www.youtube.com/channel/UCbpYaGifL2ZPRFBti_q_t1A",
    label: "YouTube",
  },
];

// Left-section column data (Company, Resources, Plans, Community, Support)
const leftSectionData = [
  {
    title: "Company",
    links: [
      { title: "About", link: "/about" },
      { title: "Careers", link: "/careers" },
      { title: "Affiliates", link: "/affiliates" },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "Articles", link: "/articles" },
      { title: "Blog", link: "/blog" },
      { title: "Chart Sheet", link: "/chart-sheet" },
      { title: "Code Challenges", link: "/code-challenges" },
      { title: "Docs", link: "/docs" },
      { title: "Projects", link: "/projects" },
      { title: "Videos", link: "/videos" },
      { title: "Workspaces", link: "/workspaces" },
    ],
  },
  {
    title: "Plans",
    links: [
      { title: "Paid membership", link: "/paid-membership" },
      { title: "For Students", link: "/for-students" },
      { title: "Business solutions", link: "/business-solutions" },
    ],
  },
  {
    title: "Community",
    links: [
      { title: "Forums", link: "/forums" },
      { title: "Chapters", link: "/chapters" },
      { title: "Events", link: "/events" },
    ],
  },
  {
    title: "Support",
    links: [{ title: "Help Center", link: "/help-center" }],
  },
];

const Footer = () => {
  return (
    <footer className="bg-richblack-800 text-richblack-400">
      <div className="w-11/12 max-w-maxContent mx-auto px-4 py-12 md:px-6 md:py-14">
        {/* ─── TOP SECTION ─── */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          {/* LEFT SECTION — logo, company links, social */}
          <div className="lg:w-1/2">
            <div className="mb-8">
              {/* Logo + brand name */}
              <div className="flex items-center gap-2 text-richblack-50 mb-6 group">
                <img
                  src={logo}
                  alt="StudyNotion Logo"
                  className="h-6 group-hover:scale-105 transition-transform duration-200"
                />
                <h3 className="text-xl font-semibold group-hover:text-yellow-50 transition-colors duration-200">
                  StudyNotion
                </h3>
              </div>

              {/* Company / Resources / Plans / Community / Support columns */}
              <div className="mb-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {leftSectionData.map((section, index) => (
                    <div key={index} className="space-y-2">
                      <p className="text-richblack-100 font-semibold text-sm md:text-base">
                        {section.title}
                      </p>
                      <ul className="space-y-1">
                        {section.links.map((link, linkIndex) => (
                          <li key={linkIndex}>
                            {/* ✅ FIX: Changed <a href="..."> to React Router <Link to="...">
                                for internal routes.  Plain <a> tags cause a full page reload
                                on click — <Link> does a client-side navigation, which is
                                faster and preserves app state (Redux, scroll position, etc.). */}
                            <Link
                              to={link.link}
                              className="text-richblack-400 hover:text-richblack-50 transition-colors duration-200 text-xs md:text-sm"
                            >
                              {link.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social media icons */}
              <div>
                <p className="text-richblack-100 font-semibold mb-3">
                  Connect with us
                </p>
                <div className="flex gap-4 text-xl md:text-2xl">
                  {socialLinks.map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-yellow-50 transition-all duration-200 hover:scale-110"
                      aria-label={`Follow us on ${item.label}`}
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Vertical divider — visible only on large screens */}
          <div className="hidden lg:block w-px bg-richblack-700"></div>

          {/* RIGHT SECTION — Subjects / Languages / Career building (from FooterLink2 data) */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {FooterLink2.map((section, index) => (
                <div key={index} className="space-y-3">
                  <p className="text-richblack-100 font-semibold text-sm md:text-base">
                    {section.title}
                  </p>
                  <ul className="space-y-1">
                    {section.links
                      // ✅ FIX: Filter out the placeholder separator entry { title: "-" }
                      // that existed in the Career building section of footer-links.js
                      .filter((link) => link.title !== "-")
                      .map((link, linkIndex) => (
                        <li key={linkIndex}>
                          {/* ✅ Same <Link> fix as left section above */}
                          <Link
                            to={link.link}
                            className="text-richblack-400 hover:text-richblack-50 transition-colors duration-200 text-xs md:text-sm"
                          >
                            {link.title}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── BOTTOM SECTION — copyright + legal links ─── */}
        <div className="border-t border-richblack-700 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Dynamic copyright year so it never goes stale */}
            <p className="text-richblack-300 text-sm text-center md:text-left">
              © {new Date().getFullYear()} StudyNotion. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
              <Link
                to="/privacy"
                className="text-richblack-400 hover:text-richblack-50 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-richblack-400 hover:text-richblack-50 transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="text-richblack-400 hover:text-richblack-50 transition-colors duration-200"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import classNames from "classnames";
import { SectionSplitProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Image from "../elements/Image";

const propTypes = {
  ...SectionSplitProps.types,
};

const defaultProps = {
  ...SectionSplitProps.defaults,
};

const FeaturesSplit = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  title = "",
  subheading = "",
  list = [],
  ...props
}) => {
  const outerClasses = classNames(
    "features-split section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "features-split-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const splitClasses = classNames(
    "split-wrap",
    invertMobile && "invert-mobile",
    invertDesktop && "invert-desktop",
    alignTop && "align-top"
  );

  const sectionHeader = {
    title: title,
    paragraph: subheading,
  };

  const Img = ({ image }) => {
    return (
      <div
        className={classNames(
          "split-item-image center-content-mobile ",
          imageFill && "split-item-image-fill"
        )}
        data-reveal-container=".split-item"
      >
        <Image
          src={`https://${image.defaultHost}/i/${image.endpoint}/${image.name}`}
          alt="Features split 01"
          width={528}
          height={396}
        />
      </div>
    );
  };
  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={splitClasses}>
            {list.map((item, index) => {
              return (
                <div className="split-item" key={index}>
                  {item.from === "right" && item.image && (
                    <Img image={item.image} />
                  )}
                  <div
                    className={`split-item-content center-content-mobile`}
                    data-reveal-container=".split-item"
                  >
                    <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                      {item.title}
                    </div>
                    <h3 className="mt-0 mb-12">{item.tag}</h3>
                    <p className="m-0">{item.subheading}</p>
                  </div>
                  {item.from === "left" && item.image && (
                    <Img image={item.image} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;

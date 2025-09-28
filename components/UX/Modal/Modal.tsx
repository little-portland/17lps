// ...unchanged imports

const Modal: FC<SidebarProps> = ({
  children,
  open,
  close,
  email,
  phone,
  link,
  link2,
  link3,
  className,
}) => {
  const { isMobile } = useDeviceDetect();
  const [copied, setCopied] = useState(false);
  const closeHandler = () => { close(); setCopied(false); };

  const eatEmail = "eat@little-portland.com";

  return (
    <>
      {open && (
        <>
          <Grid className={className}>
            <div />
            <Middle>
              <div style={{ position: "relative" }}>
                <Top onClick={closeHandler}><Closer /></Top>
                <div style={{ maxWidth: "80vw" }}>{children}</div>
              </div>
            </Middle>

            {/* Make the buttons area a 2-col grid */}
            <ButtonWrapper
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "12px",
              }}
            >
              {link && (
                <FirstButtonWrapper>
                  <div className="sample-menu btn-wrapper">
                    <Link href={link.target}>
                      <a><Button btnType="solid">{link.title}</Button></a>
                    </Link>
                  </div>
                </FirstButtonWrapper>
              )}

              {link2 && (
                <FirstButtonWrapper>
                  <div className="sample-menu btn-wrapper">
                    <Link href={link2.target}>
                      <a><Button btnType="solid">{link2.title}</Button></a>
                    </Link>
                    <a
                      className="insta"
                      href="https://www.instagram.com/thetentattheendoftheuniverse/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Image src={"/images/instagram.svg"} width={25} height={25} />
                    </a>
                  </div>
                </FirstButtonWrapper>
              )}

              {/* Make this one full width (spans both columns) */}
              {link3 && (
                <FirstButtonWrapper style={{ gridColumn: "1 / -1" }}>
                  <div className="sample-menu btn-wrapper">
                    <Link href={link3.target}>
                      <a><Button btnType="solid">{link3.title}</Button></a>
                    </Link>
                  </div>
                </FirstButtonWrapper>
              )}

              {/* Full-width rows below */}
              {email && (
                <div className="btn-wrapper-border" style={{ gridColumn: "1 / -1" }}>
                  <a href={`mailto:${email}`}>
                    <Button btnType={isMobile || email === eatEmail ? "hollow" : "solid"}>
                      {isMobile ? "email" : email}
                    </Button>
                  </a>
                </div>
              )}

              {phone && (isMobile ? (
                <div className="btn-wrapper-border" style={{ gridColumn: "1 / -1" }}>
                  <a href={`tel:+${phone.replace(/\s/g, "")}`}>
                    <Button btnType="hollow">call</Button>
                  </a>
                </div>
              ) : (
                <CopyToClipboard text={phone} onCopy={() => setCopied(true)}>
                  <div className="btn-wrapper-border" style={{ gridColumn: "1 / -1" }}>
                    <Button btnType="hollow">{phone}</Button>
                  </div>
                </CopyToClipboard>
              ))}
            </ButtonWrapper>

            {copied ? (
              <span style={{ textAlign: "center", textTransform: "uppercase", fontWeight: 400 }}>
                Number copied
              </span>
            ) : null}
          </Grid>
          <BG onClick={close}></BG>
        </>
      )}
    </>
  );
};

export default Modal;

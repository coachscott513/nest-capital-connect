
const FinancingSection = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .row.one-column {
            margin: 0 !important
          }
          .row.one-column img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            padding: 0.2rem;
            filter: brightness(50%);
            -webkit-filter: brightness(50%);
          }
          .row.one-column .row-column-content {
            position: absolute;
            top: 50%;
            left: 0px;
            right: 0px;
            transform: translatey(-50%);
            text-align: center;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            color: #fff;
          }
          .row.one-column .row-column-content h3 {
            font-size: 2.1rem;
          }
          .row.one-column .row-column-content p {
            font-size: 1.1rem;
          }
        `
      }} />
      
      <section id="financing" className="py-16">
        <div className="row one-column">
          <div className="col-sm-12" style={{ minHeight: '450px' }}>
            <img 
              src="https://img.kvcore.com/cdn-cgi/image/fit=scale-down,format=auto/https://dtzulyujzhqiu.cloudfront.net/kvcoredemo14/images/1594658722_YXYBlolB3pNcEOuHmf8KJPPpzrQZtnk99VIhIXq0.jpeg" 
              alt="picture of calculator" 
            />
            <div className="row-column-content" style={{ maxWidth: '750px', margin: 'auto' }}>
              <h3 className="fw-600">Get Pre-Approved</h3>
              <p>Our partners offer low rates, low fees, and local underwriting, so we can close loans quickly.</p>
              <a className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 no-underline" href="/finance.php">
                Start Application
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FinancingSection;

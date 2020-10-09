const keys = require('../../config/keys');

module.exports = survey => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h2>I'd like your input!</h2>
          <p>Please answer the following question:</p>
          <p>${survey.body}</p>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes"><button>Yes</button></a>
          </div>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no"><button>No</button></a>
          </div>
        </div>
      </body>
    </html>
  `;
};
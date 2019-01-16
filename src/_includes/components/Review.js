module.exports = ({
  rating = 0,
  pros = [],
  cons = []
}) => `
  <div class="c-review">
    <div class="c-review__rating">
      <p class="c-review__heading">Rating <span class="u-hidden-visually">out of 5</span></p>
      <span class="c-review__total">${rating}</span>
      <div class="c-review__stars">
        ${Array(5).fill(0).map((el, i) => {
          return `<svg focusable="false" aria-hidden="true" width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg"><path d="M8 11.55l-4.702 2.922 1.326-5.375-4.232-3.57 5.522-.399L8 0l2.086 5.128 5.522.4-4.232 3.569 1.326 5.375z" fill="${Math.floor(rating) <= i ? '#767676' : '#FFF'}" fill-rule="evenodd"/></svg>`;
        }).join('')}
      </div>
    </div>
    <div class="c-review__lists">
      <div class="c-prose">
        <h2>Pros</h2>
        <ul>
          ${pros.map(item => {
            return `<li>${item}</li>`;
          }).join('')}
        </ul>
        <h2>Cons</h2>
        <ul>
        ${cons.map(item => {
          return `<li>${item}</li>`;
        }).join('')}
        </ul>
      </div>
    </div>
  </div>
`
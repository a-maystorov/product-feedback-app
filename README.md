# Frontend Mentor - Product feedback app

This is a solution to the [Product feedback app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-feedback-app-wbvUYqjR6).

## 📑 Table of contents

- [Overview 👁‍🗨](#overview)
  - [Requirements ](#requirements)
  - [Screenshots 📸](#screenshots)
  - [Links 🔗](#links)
- [My process ⚙](#my-process)
  - [Built with 🛠](#built-with)
  - [What I learned 📚](#what-i-learned)
  - [Useful resources 🔍](#useful-resources)
- [Author 🖋](#author)

## Overview

### Requirements 

Users should be able to:

    ✅ View the optimal layout for the app depending on their device's screen size
    ✅ See hover states for all interactive elements on the page
    ✅ Create, read, update, and delete product feedback requests
    ✅ Receive form validations when trying to create/edit feedback requests
    ✅ Sort suggestions by most/least upvotes and most/least comments
    ✅ Filter suggestions by category
    ✅ Add comments and replies to a product feedback request
    ✅ Upvote product feedback requests
    ❌ **Bonus**: Keep track of any changes, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app)

### Screenshots

![](https://github.com/SirDev97/product-feedback-app/blob/main/public/assets/solution-images/home-desktop.jpeg?raw=true)
![](https://github.com/SirDev97/product-feedback-app/blob/main/public/assets/solution-images/home-tablet-mobile.png?raw=true)
![](https://github.com/SirDev97/product-feedback-app/blob/main/public/assets/solution-images/create-edit.png?raw=true)
![](https://github.com/SirDev97/product-feedback-app/blob/main/public/assets/solution-images/details-desktop.jpeg?raw=true)

### Links

- Solution URL: [Repo](https://github.com/SirDev97/product-feedback-app)
- Live Site URL: [GH-Pages](https://sirdev97.github.io/product-feedback-app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library

### What I learned

This was a fun project to build, and the whole process was a huge learning experience, from managing state, conditional rendering, passing props, routing, working with arrays, and more. I would need to write an entire blog post about every single detail. 😆

Throughout the project, one piece of code that I am pleased with how it worked out and proud of is the way I handled sorting the suggestions by category and other criteria:

- **Note: I am not sure if this is the most optimal or efficient way to solve this problem, but this was what I was able to come up with, and I stuck with it... 😅**

```js
const [currentCategory, setCurrentCategory] = useState('all');
const [currentSortCriteria, setCurrentSortCriteria] = useState('Most Upvotes');

const changeCategory = (newCategory) => setCurrentCategory(newCategory);
const changeSortCriteria = (newCriteria) => setCurrentSortCriteria(newCriteria);

const sortedSuggestions = suggestionRequests
  ? suggestionRequests.sort((a, b) => {
      const commentsA = a.comments ? a.comments.length : 0;
      const commentsB = b.comments ? b.comments.length : 0;

      const repliesA = a.comments ? a.comments : [];
      const filteredRepliesA = repliesA.filter((comment) => {
        return comment.replies ? comment.replies : null;
      });

      const repliesB = b.comments ? b.comments : [];
      const filteredRepliesB = repliesB.filter((comment) => {
        return comment.replies ? comment.replies : null;
      });

      const repliesLengthA = filteredRepliesA[0]
        ? filteredRepliesA[0].replies.length
        : 0;
      const repliesLengthB = filteredRepliesB[0]
        ? filteredRepliesB[0].replies.length
        : 0;

      const A = commentsA + repliesLengthA;
      const B = commentsB + repliesLengthB;

      switch (currentSortCriteria) {
        case 'Most Upvotes':
          return b.upvotes - a.upvotes;
        case 'Least Upvotes':
          return a.upvotes - b.upvotes;
        case 'Most Comments':
          return B - A;
        case 'Least Comments':
          return A - B;
        default:
          return b.upvotes - a.upvotes;
      }
    })
  : null;

const suggestions = sortedSuggestions
  ? sortedSuggestions.filter((suggestion) => {
      switch (currentCategory) {
        case 'all':
          return true;
        case 'UI':
        case 'UX':
        case 'enhancement':
        case 'bug':
        case 'feature':
          return suggestion.category === currentCategory;
        default:
          return true;
      }
    })
  : null;
```

### Useful resources

- [SPA with GH-Pages](https://github.com/rafgraph/spa-github-pages) - This was a handy resource when deploying a SPA to GH-Pages since it does not support React SPA's natively. Huge props to the author; this repository helped me figure out many of my questions during the deployment process.

## Author

- LinkedIn - [Alkin Maystorov](https://www.linkedin.com/in/alkin-maystorov/)
- Frontend Mentor - [@SirDev97](https://www.frontendmentor.io/profile/SirDev97)
- Website - [alkinmaystorov.com](https://www.alkinmaystorov.com)

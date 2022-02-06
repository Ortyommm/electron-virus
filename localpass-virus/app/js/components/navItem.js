export default ({ text, isActive, id }) => {
  return `<li class="nav-item" >
        <a id="${id}" class="nav-link ${
    isActive ? "active" : ""
  }" href="#">${text}</a>
    </li>`;
};

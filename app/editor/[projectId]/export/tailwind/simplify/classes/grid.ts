const gridProps = ["grid-cols-", "grid-rows-"];
const regex = /\[repeat\((\d+),_minmax\(0px,_1fr\)\)\]/;

export function simplifyGrid(classes: string[]) {
  return classes.map((cls) => {
    const prop = gridProps.find((p) => cls.startsWith(p));
    if (!prop) return cls;
    const match = cls.match(regex);
    if (!match) return cls;
    return `${prop}${match[1]}`;
  });
}

// console.log(
//   simplifyGrid(
//     "grid grid-cols-[repeat(10,_minmax(10px,_1fr))] grid-rows-[repeat(10,_minmax(0,_1fr))] bg-white".split(
//       " "
//     )
//   )
// );

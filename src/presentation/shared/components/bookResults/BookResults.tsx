// export interface BookResultsProps {
//   livros: BookResponseDTO[] | undefined;
// }

// function BookResults() {
//   return (
//     <div className="bg-card-bg border border-border rounded-xl px-4 py-3 lg:p-6 lg:py-6 mb-4">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-3">
//           <span className="text-xs font-thin px-2 py-1 rounded-xs">
//             {livros ? livros.length : 0} livros
//           </span>
//         </div>
//       </div>
//       <div className="flex gap-4 overflow-x-auto pt-2 pb-3 pl-2 custom-scroll">
//         {livros?.map((livro) => (
//           <BookCard
//             key={livro.id}
//             id={String(livro.id)}
//             title={livro.titulo}
//             author={livro.autores?.[0]?.nome || ''}
//             cover={livro.capaUrl}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default BookResults;

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Nota: 1) validar lo del actualizar la pagina con el navegador para que cargen los datos nuevamente.
      2) en el dashboard poder mostrar todos los blogs porque solo salen los published.
      3) en el dashboard verificar el boton View Post del detail blog.
      


<form onSubmit={onSubmit} className="flex w-full">

    <span className="flex-grow">
        
    <CKEditor
        editor={ ClassicEditor }
        name='content'
        type='text'
        className="border border-gray-400 rounded-lg w-full"
        {...register('content', {
            required: {
                value: true,
                message: "es requerido"
                }
            })
        }
        onReady={ editor => {
            // Puedes guardar el "editor" y usarlo cuando sea necesario.
            console.log( 'El editor está listo para usar!', editor );
            //setContent(editor)
        } }
        onChange={ ( event, editor ) => {
            
            console.log( { event, editor} );
        } }
        onBlur={ ( event, editor ) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            setContent(data);
            // Agrega lógica adicional aquí si es necesario

            // Esto puede ser necesario para notificar a React Hook Form sobre el cambio
            // Puedes intentar desencadenar la validación manualmente
            trigger('content');
        } }                                                    
    />
    </span>
    <span className="ml-4 flex-shrink-0">
        <button
        type="submit"
        className="rounded-md mr-2 bg-white font-medium text-indigo-600 hover:text-indigo-500"
        >
        Save
        </button>
        <div
        onClick={()=>setUpdateContent(false)}
        className="cursor-pointer inline-flex rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
        >
        Cancel
        </div>
    </span>
</form>



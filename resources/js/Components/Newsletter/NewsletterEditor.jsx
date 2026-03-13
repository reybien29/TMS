import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function NewsletterEditor({ value, onChange, error }) {
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    return (
        <div className="newsletter-editor">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                className="bg-white dark:bg-gray-900 dark:text-gray-100 rounded-md min-h-[300px]"
            />
            {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
            
            <style jsx global>{`
                .ql-editor {
                    min-height: 300px;
                }
                .dark .ql-toolbar {
                    background-color: #374151;
                    border-color: #4b5563;
                }
                .dark .ql-container {
                    border-color: #4b5563;
                }
                .dark .ql-stroke {
                    stroke: #e5e7eb;
                }
                .dark .ql-fill {
                    fill: #e5e7eb;
                }
                .dark .ql-picker {
                    color: #e5e7eb;
                }
            `}</style>
        </div>
    );
}

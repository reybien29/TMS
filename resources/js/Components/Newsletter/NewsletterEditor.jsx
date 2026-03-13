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
            <div className="relative">
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={onChange}
                    modules={modules}
                    formats={formats}
                    className="bg-white dark:bg-gray-900 dark:text-gray-100 rounded-md min-h-[300px] border border-gray-200 dark:border-gray-700"
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">
                    {value ? value.length : 0} characters
                </div>
            </div>
            {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}

            <style jsx global>{`
                .ql-editor {
                    min-height: 300px;
                    padding: 1rem;
                    font-size: 16px;
                    line-height: 1.6;
                }

                .ql-toolbar {
                    border-top-left-radius: 0.375rem;
                    border-top-right-radius: 0.375rem;
                    border-color: #e5e7eb;
                    background-color: #f9fafb;
                }

                .ql-container {
                    border-bottom-left-radius: 0.375rem;
                    border-bottom-right-radius: 0.375rem;
                    border-color: #e5e7eb;
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

                .ql-toolbar button:hover {
                    background-color: #e5e7eb;
                }

                .dark .ql-toolbar button:hover {
                    background-color: #4b5563;
                }

                .ql-toolbar .ql-active {
                    background-color: #dbeafe;
                    color: #1d4ed8;
                }

                .dark .ql-toolbar .ql-active {
                    background-color: #1e3a8a;
                    color: #bfdbfe;
                }
            `}</style>
        </div>
    );
}

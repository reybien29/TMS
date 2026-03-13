<?php

namespace App\Http\Controllers\Newsletter;

use App\Enums\NewsletterStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Newsletter\StoreNewsletterRequest;
use App\Http\Requests\Newsletter\UpdateNewsletterRequest;
use App\Models\Newsletter;
use Inertia\Inertia;

class NewsletterController extends Controller
{
    public function index()
    {
        $newsletters = Newsletter::where('user_id', auth()->id())
            ->withCount(['campaigns' => function ($query) {
                $query->where('status', '!=', 'failed');
            }])
            ->latest()
            ->paginate(10);

        return Inertia::render('Newsletter/Index', [
            'newsletters' => $newsletters,
        ]);
    }

    public function create()
    {
        return Inertia::render('Newsletter/Create');
    }

    public function store(StoreNewsletterRequest $request)
    {
        $newsletter = Newsletter::create([
            'title' => $request->title,
            'subject' => $request->subject,
            'content' => $request->content,
            'status' => NewsletterStatus::Draft,
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('newsletter.index')->with('success', 'Newsletter created successfully.');
    }

    public function show(Newsletter $newsletter)
    {
        $this->authorize('view', $newsletter);

        $newsletter->load(['campaigns' => function ($query) {
            $query->withCount('metrics')->latest();
        }]);

        return Inertia::render('Newsletter/Show', [
            'newsletter' => $newsletter,
        ]);
    }

    public function edit(Newsletter $newsletter)
    {
        $this->authorize('update', $newsletter);

        return Inertia::render('Newsletter/Edit', [
            'newsletter' => $newsletter,
        ]);
    }

    public function update(UpdateNewsletterRequest $request, Newsletter $newsletter)
    {
        $this->authorize('update', $newsletter);

        $newsletter->update([
            'title' => $request->title,
            'subject' => $request->subject,
            'content' => $request->content,
        ]);

        return redirect()->route('newsletter.index')->with('success', 'Newsletter updated successfully.');
    }

    public function destroy(Newsletter $newsletter)
    {
        $this->authorize('delete', $newsletter);

        $newsletter->delete();

        return redirect()->route('newsletter.index')->with('success', 'Newsletter deleted successfully.');
    }
}

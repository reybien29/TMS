<?php

namespace App\Http\Controllers;

use App\Models\Registration;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TicketController extends Controller
{
    public function index()
    {
        $tickets = Ticket::where('user_id', Auth::id())->latest()->paginate(10);

        return inertia('Tickets/Index', [
            'tickets' => $tickets,
        ]);
    }

    public function create()
    {
        $registrations = Registration::where('user_id', Auth::id())->get();

        return inertia('Tickets/Create', [
            'registrations' => $registrations,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'registration_id' => 'required|exists:registrations,id',
            'ticket_number' => 'required|string|unique:tickets',
            'status' => 'required|in:active,used,expired',
            'qr_code' => 'nullable|string',
        ]);

        $validated['user_id'] = Auth::id();

        Ticket::create($validated);

        return redirect()->route('tickets.index')
            ->with('success', 'Ticket created successfully.');
    }

    public function show(Ticket $ticket)
    {
        $this->authorize('view', $ticket);

        $ticket->load(['registration.event']);

        return inertia('Tickets/Show', [
            'ticket' => $ticket,
        ]);
    }

    public function edit(Ticket $ticket)
    {
        $this->authorize('update', $ticket);

        $registrations = Registration::where('user_id', Auth::id())->get();

        return inertia('Tickets/Edit', [
            'ticket' => $ticket,
            'registrations' => $registrations,
        ]);
    }

    public function update(Request $request, Ticket $ticket)
    {
        $this->authorize('update', $ticket);

        $validated = $request->validate([
            'registration_id' => 'required|exists:registrations,id',
            'ticket_number' => 'required|string|unique:tickets,ticket_number,'.$ticket->id,
            'status' => 'required|in:active,used,expired',
            'qr_code' => 'nullable|string',
        ]);

        $ticket->update($validated);

        return redirect()->route('tickets.index')
            ->with('success', 'Ticket updated successfully.');
    }

    public function destroy(Ticket $ticket)
    {
        $this->authorize('delete', $ticket);

        $ticket->delete();

        return redirect()->route('tickets.index')
            ->with('success', 'Ticket deleted successfully.');
    }
}

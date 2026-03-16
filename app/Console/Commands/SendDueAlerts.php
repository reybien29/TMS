<?php

namespace App\Console\Commands;

use App\Models\Due;
use App\Notifications\DueDateAlert;
use Illuminate\Console\Command;

class SendDueAlerts extends Command
{
    protected $signature = 'app:send-due-alerts';

    protected $description = 'Send alerts for dues that are coming due or overdue';

    public function handle()
    {
        // Get dues that are due in exactly 3 days or today
        $dues = Due::whereIn('due_date', [now()->addDays(3)->toDateString(), now()->toDateString()])
            ->where('status', '!=', 'paid')
            ->get();

        foreach ($dues as $due) {
            $due->user->notify(new DueDateAlert($due));
            $this->info('Sent due alert to: '.$due->user->name);
        }

        // Mark as overdue if past due_date
        Due::where('due_date', '<', now()->toDateString())
            ->where('status', 'pending')
            ->update(['status' => 'overdue']);
    }
}

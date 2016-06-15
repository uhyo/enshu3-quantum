xs = linspace(0, 1, 5000);
ys1 = xs;
ys2 = xs .^ 0.5;
ys3 = xs .^ 2;
ys4 = (808/75) * (xs .^ 3) - 16.4 * (xs .^ 2) + (497/75) * xs;

figure(1);
clf;
hold on;
plot(xs, ys1, 'k--', 'linewidth', 2);
plot(xs, ys2, 'r-', 'linewidth', 2);
plot(xs, ys3, 'b-', 'linewidth', 2);
plot(xs, ys4, 'm-', 'linewidth', 4);

axis([0 1 0 1]);
set(gca, 'fontsize', 20);

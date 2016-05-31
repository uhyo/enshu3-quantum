fid = fopen('../data/hadamard-line-3.txt', 'r', 'native');

data = fscanf(fid, '%d %f',[2, Inf]);

figure(1);
clf;
plot(data(1,:), data(2,:), 'r-', 'linewidth', 3);

set(gca, 'fontsize', 20);

hx = xlabel('n');
#set(hx, 'fontsize', 14);
hy = ylabel('t');
#set(hy, 'fontsize', 14);
